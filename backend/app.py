from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_jwt_extended.exceptions import JWTExtendedException
from datetime import timedelta, datetime
import bcrypt
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure CORS
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

# MySQL Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{os.getenv('DB_USER', 'root')}:{os.getenv('DB_PASSWORD', '')}@{os.getenv('DB_HOST', 'localhost')}/{os.getenv('DB_NAME', 'inventory_db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config['JWT_TOKEN_LOCATION'] = ['headers']
app.config['JWT_HEADER_NAME'] = 'Authorization'
app.config['JWT_HEADER_TYPE'] = 'Bearer'

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    name = db.Column(db.String(100))
    role = db.Column(db.String(20), default='user')
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())
    last_login = db.Column(db.DateTime)
    is_active = db.Column(db.Boolean, default=True)

    def __repr__(self):
        return f'<User {self.email}>'

# Inventory Model
class Inventory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(100), nullable=False)
    sku = db.Column(db.String(50), unique=True, nullable=False)
    category = db.Column(db.String(50))
    quantity = db.Column(db.Integer, default=0)
    unit_price = db.Column(db.Float, default=0.0)
    supplier = db.Column(db.String(100))
    location = db.Column(db.String(100))
    min_stock_level = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())
    last_restock_date = db.Column(db.DateTime)
    description = db.Column(db.Text)

    def __repr__(self):
        return f'<Inventory {self.product_name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'product_name': self.product_name,
            'sku': self.sku,
            'category': self.category,
            'quantity': self.quantity,
            'unit_price': self.unit_price,
            'supplier': self.supplier,
            'location': self.location,
            'min_stock_level': self.min_stock_level,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'last_restock_date': self.last_restock_date.isoformat() if self.last_restock_date else None,
            'description': self.description
        }

# Create database tables
with app.app_context():
    db.create_all()

# Helper function to hash password
def hash_password(password):
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed.decode('utf-8')  # Convert bytes to string for storage

# Helper function to check password
def check_password(password, hashed):
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))  # Convert string back to bytes

# Routes
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Missing required fields'}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400

    hashed_password = hash_password(data['password'])
    new_user = User(
        email=data['email'],
        password=hashed_password,
        name=data.get('name', ''),
        role=data.get('role', 'user')
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Missing email or password'}), 400

    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not check_password(data['password'], user.password):
        return jsonify({'error': 'Invalid email or password'}), 401

    if not user.is_active:
        return jsonify({'error': 'Account is deactivated'}), 403

    # Update last login
    user.last_login = db.func.now()
    db.session.commit()

    access_token = create_access_token(
        identity=str(user.id),
        additional_claims={
            'email': user.email,
            'role': user.role,
            'name': user.name
        }
    )

    return jsonify({
        'access_token': access_token,
        'user': {
            'id': user.id,
            'email': user.email,
            'name': user.name,
            'role': user.role
        }
    }), 200

@app.route('/api/user', methods=['GET'])
@jwt_required()
def get_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({
        'id': user.id,
        'email': user.email,
        'name': user.name,
        'role': user.role,
        'last_login': user.last_login.isoformat() if user.last_login else None
    }), 200

# Inventory Routes
@app.route('/api/inventory', methods=['GET'])
@jwt_required()
def get_inventory():
    try:
        print("Headers:", request.headers)
        print("Authorization:", request.headers.get('Authorization'))
        
        # Verify JWT token
        try:
            current_user_id = get_jwt_identity()
            print("Current user ID:", current_user_id)
            
            if not current_user_id:
                print("No user ID found in token")
                return jsonify({'error': 'Invalid token'}), 401
                
            # Get inventory items
            items = Inventory.query.all()
            print(f"Found {len(items)} inventory items")
            return jsonify([item.to_dict() for item in items]), 200
            
        except Exception as jwt_error:
            print("JWT Error:", str(jwt_error))
            return jsonify({'error': str(jwt_error)}), 422
            
    except Exception as e:
        print("Unexpected Error in get_inventory:", str(e))
        return jsonify({'error': str(e)}), 500

@app.route('/api/inventory', methods=['POST'])
@jwt_required()
def add_inventory():
    data = request.get_json()
    
    if not data or not data.get('product_name') or not data.get('sku'):
        return jsonify({'error': 'Missing required fields'}), 400

    if Inventory.query.filter_by(sku=data['sku']).first():
        return jsonify({'error': 'SKU already exists'}), 400

    new_item = Inventory(
        product_name=data['product_name'],
        sku=data['sku'],
        category=data.get('category'),
        quantity=data.get('quantity', 0),
        unit_price=data.get('unit_price', 0.0),
        supplier=data.get('supplier'),
        location=data.get('location'),
        min_stock_level=data.get('min_stock_level', 0),
        description=data.get('description')
    )

    db.session.add(new_item)
    db.session.commit()

    return jsonify(new_item.to_dict()), 201

@app.route('/api/inventory/<int:item_id>', methods=['PUT'])
@jwt_required()
def update_inventory(item_id):
    item = Inventory.query.get(item_id)
    if not item:
        return jsonify({'error': 'Item not found'}), 404

    data = request.get_json()
    
    if 'product_name' in data:
        item.product_name = data['product_name']
    if 'category' in data:
        item.category = data['category']
    if 'quantity' in data:
        item.quantity = data['quantity']
    if 'unit_price' in data:
        item.unit_price = data['unit_price']
    if 'supplier' in data:
        item.supplier = data['supplier']
    if 'location' in data:
        item.location = data['location']
    if 'min_stock_level' in data:
        item.min_stock_level = data['min_stock_level']
    if 'description' in data:
        item.description = data['description']

    db.session.commit()
    return jsonify(item.to_dict()), 200

@app.route('/api/inventory/<int:item_id>', methods=['DELETE'])
@jwt_required()
def delete_inventory(item_id):
    item = Inventory.query.get(item_id)
    if not item:
        return jsonify({'error': 'Item not found'}), 404

    db.session.delete(item)
    db.session.commit()
    return jsonify({'message': 'Item deleted successfully'}), 200

# Initialize default admin user
def init_admin():
    with app.app_context():
        admin = User.query.filter_by(email='admin@example.com').first()
        if not admin:
            admin = User(
                email='admin@example.com',
                password=hash_password('admin123'),
                name='Admin User',
                role='admin'
            )
            db.session.add(admin)
            db.session.commit()

# Add error handler for JWT errors
@app.errorhandler(JWTExtendedException)
def handle_jwt_error(e):
    return jsonify({'error': 'Invalid or expired token'}), 401

if __name__ == '__main__':
    init_admin()
    app.run(debug=True, port=5000)
