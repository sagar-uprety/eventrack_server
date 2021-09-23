<h1 align="center">
 <img src="./logo.jpeg" width=300/>
</h1>
<h4 align="center"> <b>EventTrack Server - Backend for Donation App</b></h4>
<div align="center">
</div>

## About ℹ️ 

This repo is the backend made with Express for EventTrack - a mobile app platform to find nearby events, register and manage their events.


## Key Components 🧑‍💻

All the API routes can be found under *routes* direcorty. Besides, the project is structured with the following components.

- Controllers
- Middlewares
- Models for User, Event and Organization
- Routes 
- Services
- Functions


## Run Locally (Development Environment) ⚒️

1. Make sure [Node.js](https://nodejs.org/en/) is installed on your machine

    ```bash
    # Clone the repository
    $ git clone https://github.com/sagar-uprety/eventrack_server
    $ cd eventrack_server
    ```

2. Start a MongoDB instance on cloud or your local server and set the following environment variables in .env file under project root directory

   - `DB_USERNAME`
   - `DB_PASSWORD`
   - `DB_HOST`
   - `DB_NAME`

3. Install dependencies
    ```bash
    $ npm install
    ```

4. Run the application
    ```bash
    # Start the server (Listens on port 3000)
    $ node index.js
    ```


## Tech Used 💻

- Framework : ExpressJS
- Database : MongoDB
- File Storage : Cloudinary
- Maps and : Mapbox
  
## Contributions

Contributions are highly welcomed. Please send a Pull Request with suggested changes or open an Issue to get things started! Feel free to tag @sagar-uprety in the issues :)