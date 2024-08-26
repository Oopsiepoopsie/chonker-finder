import os
import sys
from pathlib import Path

# directory reach
directory = Path(__file__).resolve().parent

# setting path
sys.path.append(str(directory.parent))

from server import db, app

def create_database():
    with app.app_context():
        db.create_all()
        print("Database tables created!")

if __name__ == "__main__":
    create_database()