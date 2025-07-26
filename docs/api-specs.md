# 📚 API Documentation

## 🔐 Authentication

| Method | Endpoint        | Description                               |
|--------|-----------------|-------------------------------------------|
| POST   | /api/login      | Login with email & password, return token |
| GET    | /api/user       | Get list of users                         |
| POST   | /api/user       | Create a new user                         |
| PUT    | /api/users/:id  | Update existing user                      |
| DELETE | /api/users/:id  | Delete a user                             |


### ▶️ POST /api/login

**Request:**
```json
{
  "email": "denialdi31112@gmail.com",
  "password": "123456"
}
=>
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODRiNmRmYzVlNGU1YjI1NDFiYjk1NyIsImlhdCI6MTc1MzUzMzIwMSwiZXhwIjoxNzUzNjE5NjAxfQ.8zvV3vOhJtITZsUMXQ1yGMWntMhNlPwV9jUJ5rh5czk"
}

### ▶️ GET /api/user
```json
[
    {
        "_id": "6884b6dfc5e4e5b2541bb957",
        "email": "denialdi31112@gmail.com",
        "password": "$2b$10$Ca63VPmsJ1uzN2/ZGCujDeE.rE7ekBlOYlFLKUxMyTsyGg/6/BNXC",
        "name": "DENI",
        "__v": 0
    }
]
### ▶️ POST /api/user

**Request:**
```json
{
    "name":"asdas",
    "email":"asda@swdfs.v",
    "password":"12312312"
}
=>
{
    "email": "asda@swdfs.v",
    "password": "$2b$10$pvV2PnYC1.ysxbCsHd.wUe5TVso29KgwprPrWRKFmlWSYIWvxKDjC",
    "name": "asdas",
    "_id": "6884cfa6cdeaa4d0228bcf1d",
    "__v": 0
}

### ▶️ POST /api/user/:id

**Request:**
```json
{
    "name":"DENI",
    "email":"denialdi31112@gmail.com"
}
=>
{
    "_id": "6884b6dfc5e4e5b2541bb957",
    "email": "denialdi31112@gmail.com",
    "password": "$2b$10$Ca63VPmsJ1uzN2/ZGCujDeE.rE7ekBlOYlFLKUxMyTsyGg/6/BNXC",
    "name": "DENI",
    "__v": 0
}

### ▶️ POST /api/user/:id

**message:**
{
    "message":"User deleted successfully"
}
