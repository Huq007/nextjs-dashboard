from app import app, db, User, hash_password
from datetime import datetime

def test_database_connection():
    try:
        # Test database connection
        with app.app_context():
            # First, check if we can connect to the database
            db.engine.connect()
            print("✅ Successfully connected to inventory_db!")
            
            # Create tables if they don't exist
            db.create_all()
            print("✅ Database tables created/verified!")
            
            # Try to create a test user
            test_user = User(
                email='test@example.com',
                password=hash_password('test123'),
                name='Test User',
                role='user',
                created_at=datetime.utcnow(),
                is_active=True
            )
            
            # Add and commit the test user
            db.session.add(test_user)
            db.session.commit()
            print("✅ Test user created successfully!")
            
            # Query the test user
            user = User.query.filter_by(email='test@example.com').first()
            if user:
                print(f"✅ Test user retrieved successfully!")
                print(f"User details:")
                print(f"- Email: {user.email}")
                print(f"- Name: {user.name}")
                print(f"- Role: {user.role}")
                print(f"- Created at: {user.created_at}")
                
                # Clean up - delete test user
                db.session.delete(user)
                db.session.commit()
                print("✅ Test user cleaned up successfully!")
            
            # Check if admin user exists
            admin = User.query.filter_by(email='admin@example.com').first()
            if admin:
                print("✅ Admin user exists in database!")
            else:
                print("❌ Admin user not found!")
                
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        raise e

if __name__ == '__main__':
    print("Testing database connection to inventory_db...")
    test_database_connection() 