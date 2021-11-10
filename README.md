
## Description

Drinks vendiling CQRS api

apis: 
localhost:3000/drinks/all  --retrieving all drinks
localhost:3000/drinks/:id  -- retrive single drink by id
localhost:3000/drinks/patch/:id  --update the drinks
localhost:3000/drinks/update/:id  --purchase the drinks {
    "drink" : "coke",
    money : 500
}
localhost:3000/drinks/delete/:id  --delete the drinks by id



uncomment the alternate Imports of  drinks entity in drinks.module and Queries/command handlers for test case running, this may be because of npm issues
// alternate the { Drink }  module for test-case / localhost start



```bash
$ npm install
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```