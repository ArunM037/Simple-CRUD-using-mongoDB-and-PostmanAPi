# CRUD Operation Application

This is a simple CRUD (Create, Read, Update, Delete) application built using Node.js, Express, MongoDB, and Postman for testing API endpoints.

## Prerequisites

- Node.js installed
- MongoDB installed and running
- Postman installed

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/ArunM037/Simple-CRUD-using-mongoDB-and-PostmanAPi.git
    cd Simple-CRUD-using-mongoDB-and-PostmanAPi
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB URI:
    ```sh
    MONGODB_URI=your-mongodb-uri
    ```

## Running the Application

1. Start the server:
    ```sh
    npm start
    ```

2. The server will start on `http://localhost:3000`.

## API Endpoints

Use Postman to test the following API endpoints:

### Create a new item

- **URL:** `/api/items`
- **Method:** `POST`
- **Body:**
    ```json
    {
        "name": "Item Name",
        "description": "Item Description"
    }
    ```

### Get all items

- **URL:** `/api/items`
- **Method:** `GET`

### Get a single item by ID

- **URL:** `/api/items/:id`
- **Method:** `GET`

### Update an item by ID

- **URL:** `/api/items/:id`
- **Method:** `PUT`
- **Body:**
    ```json
    {
        "name": "Updated Item Name",
        "description": "Updated Item Description"
    }
    ```

### Delete an item by ID

- **URL:** `/api/items/:id`
- **Method:** `DELETE`


