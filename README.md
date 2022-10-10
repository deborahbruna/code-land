**Back End**

- express.js (generated via express-generator)

**Front End**

- React (generated via create-react-app)
- React Router

# Get Started

1. Install the server's node modules

```bash
cd server
npm install
cd ..
```

2. Install the client's node modules

```bash
cd client
npm install
cd ..
```

3. Create your server configuration

```bash
cp ./server/sample.env ./server/.env
nano ./server/.env
```

4. Create your client configuration

```bash
cp ./client/sample.env ./client/.env
nano ./client/.env
```

5. Start the application server

```bash
cd server
npm start
```

**Note**: By default, the server will be listening for HTTP on port 3001.

8. In a new terminal window, start the client

```bash
cd [project]/client
npm start
```

**Note**: By default, the client will be listening for HTTPS on port 3000. It should open automatically in your browser, but you can also open it via https://localhost:3000