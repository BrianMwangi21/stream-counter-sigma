# stream-counter-sigma
Simple API service for Sigma Digital Challenge

## Requirements
Build a service in Node.js that exposes an API which can be consumed from any client. This service must check how many video streams a given user is watching and prevent a user from watching more than 3 video streams concurrently.

## How to run
1. Clone the project to local machine.

### Without docker
2.1 Navigate into directory `$ cd stream-counter-sigma`
2.2 Install dependencies `$ npm install`
2.3 Run application `$ npm start`

### With docker
3.1 Navigate into directory `$ cd stream-counter-sigma`
3.2 Build docker image `$ docker build --tag stream-counter-sigma .`
3.3 Run docker application `$ docker run -p 3000:3000 stream-counter-sigma`
