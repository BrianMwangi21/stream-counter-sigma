# stream-counter-sigma
Simple API service for Sigma Digital Challenge

## Requirements
Build a service in Node.js that exposes an API which can be consumed from any client. This service must check how many video streams a given user is watching and prevent a user from watching more than 3 video streams concurrently.

## How to run
1. Clone the project to local machine.

### Without docker
- Navigate into directory `$ cd stream-counter-sigma`
- Install dependencies `$ npm install`
- Run application `$ npm start`

### With docker
- Navigate into directory `$ cd stream-counter-sigma`
- Build docker image `$ docker build --tag stream-counter-sigma .`
- Run docker application `$ docker run -p 3000:3000 stream-counter-sigma`

## Usage
The service exposes two endpoints : 

1. /check-user-stream -> `localhost:3000/api/v1/check-user-stream` 

This POST endpoint accepts a JSON payload with only one variable 'username'. The service then checks the database for the username. If the user does not exist, it creates a record and sets the stream to 1. If the user does exist, it increments the number of streams until they are 3 after which it does not increment but responds with saying the limit has been reached.

Sample request :

```json
{
    "data": {
        "status": 1,
        "message": "User cannot have more than 3 video streams",
        "data": {
            "id": 2,
            "username": "kabiru",
            "streams": 3
        }
    }
}
```

Sample response when streams are less than 3 : 

```json
{
    "data": {
        "status": 0,
        "message": "User stream updated successfully",
        "data": {
            "id": 2,
            "username": "kabiru",
            "streams": 2
        }
    }
}
```

Sample response when stream limit is reached : 

```json
{
    "data": {
        "status": 1,
        "message": "User cannot have more than 3 video streams",
        "data": {
            "id": 2,
            "username": "kabiru",
            "streams": 3
        }
    }
}
```
2. /get-user-streams -> `localhost:3000/api/v1/get-user-streams` 

This GET endpoint just shows all the user streams stored in the database.

Sample response :

```json
{
    "data": {
        "status": 0,
        "message": "All User Streams fetched successfully",
        "data": {
            "content": [
                {
                    "id": 1,
                    "username": "stream-counter-sigma",
                    "streams": 1
                },
                {
                    "id": 2,
                    "username": "kabiru",
                    "streams": 3
                }
            ],
            "count": 2
        }
    }
}
```

## Database
The service uses an SQLite3 database. The reason behind using this database for this code challenge is because it is lightweight, easy to use locally and spans only the life of the project while in use. 
