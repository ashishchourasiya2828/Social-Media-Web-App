# Users API Documentation

## Base URL
`/users`

### 1. Register User
- **Endpoint:** `POST /register`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "username": "username",
    "password": "password123"
  }
  ```
- **Response:**
  - **201 Created**
    ```json
    {
      "user": {
        "email": "user@example.com",
        "username": "username",
        "profilePicture": "url_to_profile_picture"
      }
    }
    ```
  - **400 Bad Request**
    ```json
    {
      "errors": [
        {
          "msg": "Email or username already exists"
        }
      ]
    }
    ```

### 2. Login User
- **Endpoint:** `POST /login`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  - **200 OK**
    ```json
    {
      "user": {
        "email": "user@example.com",
        "username": "username"
      },
      "token": "jwt_token_here"
    }
    ```
  - **401 Unauthorized**
    ```json
    {
      "message": "invalid email or password"
    }
    ```

### 3. Logout User
- **Endpoint:** `GET /logout`
- **Response:**
  - **200 OK**
    ```json
    {
      "message": "logged out successfully"
    }
    ```

### 4. Get User Profile
- **Endpoint:** `GET /:id/profile`
- **Response:**
  - **200 OK**
    ```json
    {
      "email": "user@example.com",
      "username": "username",
      "bio": "User bio",
      "profilePicture": "url_to_profile_picture"
    }
    ```

### 5. Update User Profile
- **Endpoint:** `PUT /:id/update`
- **Request Body:**
  ```json
  {
    "username": "new_username",
    "bio": "Updated bio",
    "email": "new_email@example.com"
  }
  ```
- **Response:**
  - **200 OK**
    ```json
    {
      "email": "new_email@example.com",
      "username": "new_username",
      "bio": "Updated bio"
    }
    ```
  - **404 Not Found**
    ```json
    {
      "message": "User not found"
    }
    ```

### 6. Reset Password
- **Endpoint:** `POST /reset-password`
- **Request Body:**
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Response:**
  - **200 OK**
    ```json
    {
      "message": "Password reset email sent"
    }
    ```
  - **404 Not Found**
    ```json
    {
      "message": "User not found"
    }
    ```

### 7. Reset Password with Token
- **Endpoint:** `POST /reset-password/:token`
- **Request Body:**
  ```json
  {
    "password": "new_password123"
  }
  ```
- **Response:**
  - **200 OK**
    ```json
    {
      "message": "Password reset successfully"
    }
    ```
  - **404 Not Found**
    ```json
    {
      "error": "user not found"
    }
    ```

### 8. Follow User
- **Endpoint:** `POST /:id/follow`
- **Response:**
  - **200 OK**
    ```json
    {
      "message": "followed Successfully"
    }
    ```
  - **400 Bad Request**
    ```json
    {
      "message": "You cannot follow yourself"
    }
    ```

### 9. Update Profile Picture
- **Endpoint:** `POST /:id/profile-picture`
- **Response:**
  - **201 Created**
    ```json
    {
      "message": "Image uploaded successfully",
      "user": {
        "profilePicture": "url_to_profile_picture"
      }
    }
    ```
  - **401 Unauthorized**
    ```json
    {
      "message": "Unauthorized"
    }
    ```
  - **404 Not Found**
    ```json
    {
      "message": "User not found"
    }
    ```
