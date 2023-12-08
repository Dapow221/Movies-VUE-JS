## Endpoints

List of Available Endpoints:

- `POST /movies`
- `GET /movies`
- `GET /movies/:id`
- `DELETE /movies/:id`
- `GET /genres`
- `POST /google-login`
- `POST /register`
- `POST /login`
- `PUT /movies/:id`
- `PATCH /movies/:id`
- `POST /pub/google-login`
- `GET /pub/movies`
- `GET /pub/movies/:id`
- `POST /pub/qr-code`
- `GET /pub/favorite`
- `POST /pub/favorite`
- `DELETE /pub/favorite/:id`

### POST /movies

#### Description

- Create a new movies data

#### Request

- headers
  ```json
  {
    "access_token": "string"
  }
  ```
- Body
  ```json
  {
      "title":"string" (validation: required),
      "synopsis":"string" (validation: required),
      "trailerUrl":"integer",
      "imgUrl":"string",
      "rating":"integer" (validation: 'Rating must be at least 1'),
      "genreId": "integer",
      "authorId": "integer"
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "statusCode": 201,
    "data": {
      "title": String "(validation: required)",
      "synopsis": String "(validation: required)",
      "trailerUrl": Integer,
      "imgUrl": String,
      "rating": Integer "(validation: 'Rating must be at least 1')",
      "genreId": Integer,
      "authorId": Integer,
      "createdAt": Date,
      "updatedAt": Date
    }
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "error": {
      "message": String
    }
  }
  ```

### PUT /movies/:id
#### Description

- Update a new movies data with id

#### Request

- headers
  ```json
  {
    "access_token": "string"
  }
  ```
- Body
  ```json
  {
      "title":"string" (validation: required),
      "synopsis":"string" (validation: required),
      "trailerUrl":"integer",
      "imgUrl":"string",
      "rating":"integer" (validation: 'Rating must be at least 1'),
  }
  ```

#### Response

_201 - Updated_

- Body
  ```json
  {
    "statusCode": 201,
    "message": "done updated movies from id ${id}"
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "error": {
      "message": String
    }
  }
  ```

### PATCH /movies/:id

#### Description

- Update a status movies data with id

#### Request

- headers
  ```json
  {
    "access_token": "string"
  }
  ```
- Body
  ```json
  {
      "status": String
  }
  ```

#### Response

_201 - Updated_

- Body
  ```json
  {
    "statusCode": 201,
    "message": "movies with id ${id} status has been updated from ${findMovies.status} into ${status}"

  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "error": {
      "message": String
    }
  }
  ```

### GET /movies

#### Description

- Get all the movies data

#### Response

_200 - OK_

- headers
  ```json
  {
    "access_token": "string"
  }
  ```
- Body
  ```json
  {
    "statusCode": 200,
    "data": [
      {
        "id": Integer,
        "title": String,
        "synopsis": String,
        "trailerUrl": String,
        "imgUrl": String,
        "rating": Integer,
        "genreId": Integer,
        "authorId": Integer,
        "createdAt": Date,
        "updateAt": Date
      },
    ]
  }
  ```

### GET /movies/:id

#### Description

- Get selected the movies data by given id

#### Request

- headers
  ```json
  {
    "access_token": "string"
  }
  ```
- Body
  ```json
  {
    "id": "integer"
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": 200,
    "data": [
      {
        "id": Integer,
        "title": String,
        "synopsis": String,
        "trailerUrl": String,
        "imgUrl": String,
        "rating": Integer,
        "genreId": Integer,
        "authorId": Integer,
        "createdAt": Date,
        "updateAt": Date
      },
    ]
  }
  ```

_404 - Not Found_

- Body
  ```json
  {
    "statusCode": 404,
    "error": {
      "message": "data not found"
    }
  }
  ```

### DELETE /movies/:id

#### Description

- Remove a movies data based on given id

#### Request

- headers

  ```json
  {
    "access_token": "string"
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": 200,
    "message": "movies by ${id} success to delete"
  }
  ```

  _403 - Forbidden_
- Body

  ```json
  {
  "statusCode": 403,
  "error": {
  "message": "cannot delete movies from id ${error.id}"
    }
  }
  _404 - Not Found_
  ```
- Body

  ```json
  {
    "statusCode": 404,
    "error": {
      "message": "data not found"
    }
  }
  ```

### GET /genres

#### Description

- Get all the genres data

#### Request

- headers
  ```json
  {
    "access_token": "string"
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  [
      {
          "id": Integer,
          "name": String,
          "createdAt": Date,
          "updatedAt": Date
      }
  ]
  ```

### POST /register

#### Description

- Create a new user data

#### Request

- Body

  ```json
  {
      "username": String,
      "email": String,
      "password": String,
      "phoneNumber": Integer,
      "address": String
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "statusCode": 201,
    "id": Integer,
    "username": String,
    "email": String,
    "password": String,
    "phoneNumber": Integer,
    "address": String
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "error": {
      "message": "email must be unique"
    }
  }
  ```

### POST /login

#### Description

- Cheked input user data (login)

#### Request

- Body
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": 200,
    "token": String
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "error": {
      "message": "error invalid username or email or password"
    }
  }
  ```

### GET /histories
#### Description

- Get all the histories data

#### Response

_200 - OK_

- headers
  ```json
  {
    "access_token": "string"
  }
  ```
- Body
  ```json
  {
    "statusCode": 200,
    "data": [
      {
        "id": Integer,
        "title": String,
        "description": String,
        "updatedBy": String,
        "createdAt": Date,
        "updateAt": Date
      },
    ]
  }
  ```

404 - Not Found
Body

```json
{
  "statusCode": 404,
  "error": {
  "message": "data not found"
  }
}

```

### POST /pub/register

#### Description

- Create a new user data

#### Request

- Body

  ```json
  {
      "username": String,
      "email": String,
      "password": String,
      "phoneNumber": Integer,
      "address": String
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "statusCode": 201,
    "id": Integer,
    "email": String,
    "message": "new customer has been created"
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "statusCode": 400,
    "error": {
      "message": "email must be unique"
    }
  }
  ```

### POST /pub/login

#### Description

- Cheked input user data (login)

#### Request

- Body
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": 200,
    "token": String,
    "name": "customer name",
    "message": "user ${customer.email} has successfully login in"
  }
  ```

_401 - Unauthorized_

- Body
  ```json
  {
    "statusCode": 401,
    "error": {
      "message": "error invalid username or email or password"
    }
  }
  ```
# POST /pub/google-login

- Body
  ```json
  {
    "statusCode": 200,
    "token": String
  }
  ```
Error :
- 400 
```json
{
    "statusCode": 400,
    "error": {
      "message": "error invalid username or email or password"
    }
}
```

- 401 
```json
{
    "statusCode": 401,
    "error": {
      "message": "error invalid token"
    }
}
```
### GET /favorite

#### Description

- Get all the favorites data

#### Response

_200 - OK_

- headers
  ```json
  {
    "access_token": "string"
  }
  ```
- Body
  ```json
  {
    "statusCode": 200,
    "data": [
      {
        "id": Integer,
        "customerId": Integer,
        "movieId": Integer,
        "createdAt": Date,
        "updateAt": Date
      },
    ]
  }
  ```
### DELETE /pub/favorite/:id

#### Description

- Remove a favorite data based on given id

#### Request

- headers

  ```json
  {
    "access_token": "string"
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": 200,
    "message": "done delete favorite"
  }
  ```


_404 - Not Found_
  ```
- Body

  ```json
  {
    "statusCode": 404,
    "error": {
      "message": "data not found"
    }
  }
  ```

### POST /pub/favorite/:id

#### Description

- post selected the favorite data by given id

#### Request

- headers
  ```json
  {
    "access_token": "string"
  }
  ```
- Body
  ```json
  {
    "id": "integer"
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": 201,
    "message": "favorite has been added"
  }
  ```

_404 - Not Found_

- Body
  ```json
  {
    "statusCode": 404,
    "error": {
      "message": "data not found"
    }
  }
  ```

### GET /pub/movies

#### Description

- Get all the movies data

#### Response

_200 - OK_

- headers
  ```json
  {
    "access_token": "string"
  }
  ```
- Body
  ```json
  {
    "statusCode": 200,
    "data": [
      {
        "id": Integer,
        "title": String,
        "synopsis": String,
        "trailerUrl": String,
        "imgUrl": String,
        "rating": Integer,
        "genreId": Integer,
        "authorId": Integer,
        "createdAt": Date,
        "updateAt": Date
      },
    ]
  }
  ```

### GET /pub/movies/:id

#### Description

- Get selected the movies data by given id

#### Request

- headers
  ```json
  {
    "access_token": "string"
  }
  ```
- Body
  ```json
  {
    "id": "integer"
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "statusCode": 200,
    "data": [
      {
        "id": Integer,
        "title": String,
        "synopsis": String,
        "trailerUrl": String,
        "imgUrl": String,
        "rating": Integer,
        "genreId": Integer,
        "authorId": Integer,
        "createdAt": Date,
        "updateAt": Date
      },
    ]
  }
  ```

_404 - Not Found_

- Body
  ```json
  {
    "statusCode": 404,
    "error": {
      "message": "data not found"
    }
  }
  ```

# POST /google-login

- Body
  ```json
  {
    "statusCode": 200,
    "token": String
  }
  ```
Error :
- 400 
```json
{
    "statusCode": 400,
    "error": {
      "message": "error invalid username or email or password"
    }
}
```


- 401 
```json
{
    "statusCode": 401,
    "error": {
      "message": "error invalid token"
    }
}
```

### POST /pub/qr-code

#### Description

- Cheked input from qr code

#### Request

- Body
  ```json
  {
    "url": "string",
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "frame_name": "no-frame",
    "qr_code_text": `${url}`,
    "image_format": "SVG",
    "qr_code_logo": "scan-me-square"
  }
  ```


### Global Error

#### Response

_500 - Internal Server Error_

- Body

  ````json
  {
    "statusCode": 500,
    "error": {
      "message": "Internal Server Error"
    }
  }
  ```message = "Error Invalid Token"

  ````

_401 - Invalid Token_

- Body
  ```json
  {
    "statusCode": 401,
    "error": {
      "message": "Error Invalid Token"
    }
  }
  ```
