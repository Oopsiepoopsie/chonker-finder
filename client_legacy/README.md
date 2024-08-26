## Frontend Setup (Lagacy Next.js Project for Client)

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