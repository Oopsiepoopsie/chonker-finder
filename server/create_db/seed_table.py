import os
import sys
from pathlib import Path

# directory reach
directory = Path(__file__).resolve().parent

# setting path
sys.path.append(str(directory.parent))

import json
from server import db, app, Chonker

def seed_database():
    with app.app_context():
        # Load JSON data from file
        with open('seed_data.json') as f:
            data = json.load(f)

        # Add data to the database
        for item in data:
            chonker = Chonker(
                description=item['description'],
                category=item['category'],
                latitude=item['position']['lat'],
                longitude=item['position']['lng'],
                image_path=item['img_path']
            )
            db.session.add(chonker)

        db.session.commit()
        print("Database seeded!")

if __name__ == "__main__":
    seed_database()