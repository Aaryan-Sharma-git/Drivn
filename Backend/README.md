# User Routes Documentation

## POST /users/
### Description
This route is used to sign up a new user.

### Request
- Method: POST
- URL: `/users/`
- Headers: `Content-Type: application/json`
- Body:
  ```json
  {
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

### Response
- Success:
  - Status Code: 201
  - Body:
    ```json
    {
      "created": "user created successfully!"
    }
    ```
- Error:
  - Status Code: 400
  - Body:
    ```json
    {
      "errors": [
        {
          "msg": "Name must contain atleast 3 characters",
          "param": "firstname",
          "location": "body"
        },
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Password must contain atleast 8 characters",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

## POST /users/login
### Description
This route is used to log in an existing user.

### Request
- Method: POST
- URL: `/users/login`
- Headers: `Content-Type: application/json`
- Body:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

### Response
- Success:
  - Status Code: 200
  - Body:
    ```json
    {
      "message": "User logged in successfully!"
    }
    ```
- Error:
  - Status Code: 401
  - Body:
    ```json
    {
      "error": "Invalid email or password"
    }
    ```

## GET /users/logout
### Description
This route is used to log out the current user and blacklist the token.

### Request
- Method: GET
- URL: `/users/logout`
- Headers: `Authorization: Bearer <token>`

### Response
- Success:
  - Status Code: 200
  - Body:
    ```json
    {
      "message": "User logged out successfully!"
    }
    ```
- Error:
  - Status Code: 401
  - Body:
    ```json
    {
      "message": "UnAuthorized"
    }
    ```

## GET /users/profile
### Description
This route is used to get the profile of the current user.

### Request
- Method: GET
- URL: `/users/profile`
- Headers: `Authorization: Bearer <token>`

### Response
- Success:
  - Status Code: 200
  - Body:
    ```json
    {
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```
- Error:
  - Status Code: 401
  - Body:
    ```json
    {
      "message": "UnAuthorized Access!"
    }
    ```
