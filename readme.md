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

# Posts API Documentation

## Base URL
`/posts`

### 1. Create Post
- **Endpoint:** `POST /create`
- **Request Body:**
  ```json
  {
    "content": "This is a new post",
    "media": "url_to_media_file"
  }
  ```
- **Response:**
  - **201 Created**
    ```json
    {
      "_id": "post_id",
      "userId": "user_id",
      "content": "This is a new post",
      "media": "url_to_media_file",
      "likes": [],
      "comments": [],
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
    ```
  - **400 Bad Request**
    ```json
    {
      "error": "Media is required"
    }
    ```

### 2. Get All Posts
- **Endpoint:** `GET /all-posts`
- **Response:**
  - **200 OK**
    ```json
    [
      {
        "_id": "post_id",
        "userId": "user_id",
        "content": "This is a new post",
        "media": "url_to_media_file",
        "likes": [],
        "comments": [],
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      },
      ...
    ]
    ```

### 3. Get Posts by User
- **Endpoint:** `GET /user/:id`
- **Response:**
  - **200 OK**
    ```json
    [
      {
        "_id": "post_id",
        "userId": "user_id",
        "content": "User's post content",
        "media": "url_to_media_file",
        "likes": [],
        "comments": [],
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      },
      ...
    ]
    ```
  - **404 Not Found**
    ```json
    {
      "error": "No posts found for this user"
    }
    ```

### 4. Delete Post
- **Endpoint:** `POST /:id/delete`
- **Response:**
  - **200 OK**
    ```json
    {
      "message": "Post deleted"
    }
    ```
  - **404 Not Found**
    ```json
    {
      "error": "Post not found"
    }
    ```
  - **401 Unauthorized**
    ```json
    {
      "error": "Unauthorized"
    }
    ```

### 5. Like Post
- **Endpoint:** `POST /:id/like`
- **Response:**
  - **200 OK**
    ```json
    {
      "message": "liked" // or "unliked"
    }
    ```
  - **404 Not Found**
    ```json
    {
      "error": "Post not found"
    }
    ```

### 6. Comment on Post
- **Endpoint:** `POST /:id/comment`
- **Request Body:**
  ```json
  {
    "content": "This is a comment"
  }
  ```
- **Response:**
  - **201 Created**
    ```json
    {
      "_id": "comment_id",
      "postId": "post_id",
      "userId": "user_id",
      "content": "This is a comment",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
    ```
  - **400 Bad Request**
    ```json
    {
      "errors": [
        {
          "msg": "postId,userId and content fields are required"
        }
      ]
    }
    ```

### 7. Get Comments on Post
- **Endpoint:** `GET /:id/comments`
- **Response:**
  - **200 OK**
    ```json
    [
      {
        "_id": "comment_id",
        "postId": "post_id",
        "userId": "user_id",
        "content": "This is a comment",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      },
      ...
    ]
    ```
  - **404 Not Found**
    ```json
    {
      "error": "Post not found"
    }
    ```

### 8. Delete Comment
- **Endpoint:** `GET /comment/:id/delete`
- **Response:**
  - **200 OK**
    ```json
    {
      "message": "Comment Deleted Successfully"
    }
    ```
  - **404 Not Found**
    ```json
    {
      "error": "comment not found"
    }
    ```
  - **403 Forbidden**
    ```json
    {
      "error": "Unauthorized Action userId is not match"
    }
    ```
