from app import app
from models import db, Message

def seed_messages():
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()

        # Seed messages
        messages = [
            Message(body="Hello, world!", username="user1"),
            Message(body="Hi there!", username="user2"),
            Message(body="How are you?", username="user1")
        ]

        db.session.add_all(messages)
        db.session.commit()
        print("Database seeded!")

if __name__ == '__main__':
    seed_messages()