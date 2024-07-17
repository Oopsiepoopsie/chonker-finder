# chonker-finder
FINDING CHONKERS in Carleton (working in progress)

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

**Install frontend dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

**Start the frontend development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```