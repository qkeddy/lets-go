# Queries and Mutations

## Configuration
1. Execute the mutation `CreateUser` or `Login` which will return a token
2. Add a `Header` and set the key/value pair to `Authorization` and `Bearer` plus the token. Note: do not include the quotes in the token. 


![Example image of header in GraphQL Explorer](/assets/bearer-token-example.png)


## Queries

```
##########################
# ACCESS & USER MANAGEMENT
##########################
mutation CreateUser($createUserUsername2: String!, $email: String!, $createUserPassword2: String!) {
  createUser(username: $createUserUsername2, email: $email, password: $createUserPassword2) {
    token
    user {
      username
    }
  }
}

mutation Login($password: String!, $username: String) {
  login(password: $password, username: $username) {
    token
    user {
      username
      _id
    }
  }
}

query Users {
  users {
    _id
    username
  }
}

query QUERY_users_activities {
  users {
    _id
    username
    activities
    friends
  }
  activities {
    _id
    city
    description
  }
}

query Me {
  me {
    username
    email
    friends
    friendCount
  }
}
```

## Mutations

Below are the relevant mutations for `Friends` and `Activities`

```
##########################
# FRIEND MANAGEMENT
##########################
mutation AddFriend($friendId: ID!) {
  addFriend(friendId: $friendId) {
    username
    friends
    friendCount
  }
}

mutation RemoveFriend($friendId: ID!) {
  removeFriend(friendId: $friendId) {
    username
    friends
    friendCount
  }
}


##########################
# ACTIVITIES MANAGEMENT
##########################
mutation CreateActivity($name: String!, $city: String!, $description: String!) {
  createActivity(name: $name, location: $city, city: $city, description: $description) {
    name
    _id
  }
}

mutation AddParticipant($activityId: ID!) {
  addParticipant(activityId: $activityId) {
    name
    participants
  }
}

mutation RemoveParticipant($activityId: ID!) {
  removeParticipant(activityId: $activityId) {
    _id
    name
    participants
  }
}
```