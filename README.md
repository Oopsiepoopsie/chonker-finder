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

**Start the backend server:**

```bash
#use environment variables
export FLASK_APP=server.py
export FLASK_ENV=development
export FLASK_RUN_PORT=8080
flask run

#or
flask --app server.py run --port 8080
```


### Frontend Setup

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