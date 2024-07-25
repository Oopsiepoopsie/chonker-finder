# chonker-finder
FINDING CHONKERS in Carleton (working in progress)

Demo picture:
![image](https://github.com/user-attachments/assets/e0c93d38-d3d9-4e4d-9191-369885cabfd8)


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




**Create a `.flaskenv` file in the project root directory:**
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


## Frontend Setup

**Navigate to the frontend directory:**

```bash
cd client
```

**create an .env.local file and set it to**
```bash
# .env.local
NEXT_PUBLIC_GOOGLE_MAP_API = <Google Map API key>
NEXT_PUBLIC_GOOGLE_MAP_ID = <Google mapId>
```

**Install frontend dependencies:**

```bash
bun install
```

**Start the frontend development server:**

```bash
bun dev
```
