from app import app, db, Inventory
from datetime import datetime

def seed_inventory():
    sample_items = [
        {
            'product_name': 'Laptop Dell XPS 13',
            'sku': 'LAP-DELL-XPS13-2024',
            'category': 'Electronics',
            'quantity': 15,
            'unit_price': 1299.99,
            'supplier': 'Dell Inc.',
            'location': 'Warehouse A',
            'min_stock_level': 5,
            'description': 'Latest Dell XPS 13 laptop with Intel i7 processor',
            'last_restock_date': datetime.utcnow()
        },
        {
            'product_name': 'iPhone 15 Pro',
            'sku': 'PHN-APPLE-IP15P-2024',
            'category': 'Electronics',
            'quantity': 25,
            'unit_price': 999.99,
            'supplier': 'Apple Inc.',
            'location': 'Warehouse B',
            'min_stock_level': 10,
            'description': 'Apple iPhone 15 Pro 256GB',
            'last_restock_date': datetime.utcnow()
        },
        {
            'product_name': 'Office Chair',
            'sku': 'FUR-OFF-CHAIR-001',
            'category': 'Furniture',
            'quantity': 50,
            'unit_price': 199.99,
            'supplier': 'Office Supplies Co.',
            'location': 'Warehouse C',
            'min_stock_level': 20,
            'description': 'Ergonomic office chair with lumbar support',
            'last_restock_date': datetime.utcnow()
        },
        {
            'product_name': 'Wireless Mouse',
            'sku': 'ACC-MOUSE-WL-001',
            'category': 'Accessories',
            'quantity': 100,
            'unit_price': 29.99,
            'supplier': 'Tech Accessories Ltd.',
            'location': 'Warehouse A',
            'min_stock_level': 30,
            'description': 'Wireless mouse with long battery life',
            'last_restock_date': datetime.utcnow()
        },
        {
            'product_name': '4K Monitor',
            'sku': 'MON-4K-27-001',
            'category': 'Electronics',
            'quantity': 20,
            'unit_price': 399.99,
            'supplier': 'Display Tech Inc.',
            'location': 'Warehouse B',
            'min_stock_level': 8,
            'description': '27-inch 4K UHD Monitor with HDR',
            'last_restock_date': datetime.utcnow()
        }
    ]

    try:
        with app.app_context():
            # Clear existing inventory
            Inventory.query.delete()
            db.session.commit()
            print("✅ Cleared existing inventory")

            # Add new items
            for item_data in sample_items:
                item = Inventory(**item_data)
                db.session.add(item)
            
            db.session.commit()
            print("✅ Successfully added sample inventory items!")
            
            # Verify the items were added
            items = Inventory.query.all()
            print(f"\nAdded {len(items)} items to inventory:")
            for item in items:
                print(f"- {item.product_name} (SKU: {item.sku})")
                
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        db.session.rollback()
        raise e

if __name__ == '__main__':
    print("Seeding inventory database...")
    seed_inventory() 