## Backend Setup

**Navigate to the backend directory:**

```bash
cd server
```

**Create a virtual environment:**

```bash
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```

**Install backend dependencies:**

```bash
pip install -r requirements.txt
```

**Create a `.env` file in the project root directory:**
```bash
DATABASE_URL = sqlite:///db_chonker.db  (or YOUR_DATABASE)
```


**Create a `.flaskenv` file:**
```bash
#set flask environment variables
FLASK_APP=server.py
FLASK_ENV=development
FLASK_RUN_PORT=8080
FLASK_DEBUG = True
```
Difference between `.flaskenv` and `.env`
- **.flaskenv**: Use for automatic loading by Flask when running `flask run`.
- **.env**: Use with `python-dotenv` for *manual* loading of environment variables.


**Start the backend server:**

```bash
flask run
# or
# flask --app server.py run --port 8080
```