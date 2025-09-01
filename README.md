# Pearl Card Fare Calculator
App created to track the total fare of a list of trips

# Install Instructions
***You must have Docker installed and running beforehand***

***.env file is included for simpler install and set up***

***might have to delete db volume with `docker volume rm ...`***

1. Clone repo
2. In the root directory, where the docker-compose.yml file is, run these following commands
3. run `docker compose down`
4. run `docker compose build`
5. run `docker compose up`
6. go to `http://localhost:5173/` and the app should be up
<img width="1391" height="677" alt="Screenshot 2025-08-29 at 1 09 41 AM" src="https://github.com/user-attachments/assets/59b19981-8945-4695-9aa8-7f452eb18b36" />

# Tests
1. Run backend tests, by going to the backend folder
 - You need to install the dependencies first
 - run `python3 -m venv venv`
 - run `source venv/bin/activate`
 - The venv should be activated
 - run `pip install -r requirements.txt`
 - run `pip install -r requirements-dev.txt`
 - run `pytest`
2. Run frontend tests by going into the frontend folder
 - run `npm i` to install dependencies
 - run `npm test`

# Project Structure
1. Frontend - React for User Interface
2. Backend - Python + Flask for API
3. DB - Postgres
4. Cache - Redis
