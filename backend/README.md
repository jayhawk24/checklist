**TickList Backend README**
==========================

**Overview**
-----------

TickList is a simple Todo List application built using FastAPI, a modern Python web framework. This repository contains the backend code for TickList, which provides API endpoints for creating, reading, updating, and deleting (CRUD) tasks.

**Features**
------------

* Create, read, update, and delete tasks
* User authentication using JSON Web Tokens (JWT)
* Task assignment with due dates and priority levels
* Sorting and filtering of tasks by various criteria
* Real-time updates through WebSockets

**Prerequisites**
-----------------

To run the TickList backend, you will need:

* Python 3.9 or later
* A PostgreSQL database (version 13 or later)
* The `alembic` package for database migrations
* The `pytest` package for testing

**Getting Started**
-------------------

1. Clone this repository to your local machine: `git clone https://github.com/ticklist-backend/ticklist-backend.git`
2. Install the required packages using pip: `pip install -r requirements.txt`
3. Create a new PostgreSQL database and update the `SQLALCHEMY_DATABASE_URL` variable in `conftest.py` to point to your database.
4. Run the following command to create the database tables: `alembic upgrade head`
5. Start the FastAPI development server using: `uvicorn main:app --host 0.0.0.0 --port 8000`
6. Open a web browser and navigate to `http://localhost:8000/docs` to access the API documentation.

**Testing**
---------

The TickList backend includes comprehensive testing using Pytest. To run the tests, execute the following command:
```bash
pytest
```

**Contributing**
--------------

If you'd like to contribute to TickList or report an issue, please feel free to open a pull request or create an issue on this repository's GitHub page.

**License**
---------

TickList is licensed under the MIT License. See `LICENSE` for more information.

**Acknowledgments**
-----------------

This project was inspired by various Todo List applications and FastAPI tutorials. Special thanks to the creators of these resources, without which TickList would not have been possible.
