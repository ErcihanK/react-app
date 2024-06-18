/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      foodEntries {
        nextToken
        __typename
      }
      weightEntries {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getFoodEntry = /* GraphQL */ `
  query GetFoodEntry($id: ID!) {
    getFoodEntry(id: $id) {
      id
      userID
      food
      calories
      date
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listFoodEntries = /* GraphQL */ `
  query ListFoodEntries(
    $filter: ModelFoodEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFoodEntries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        food
        calories
        date
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const foodEntriesByUserIDAndDate = /* GraphQL */ `
  query FoodEntriesByUserIDAndDate(
    $userID: ID!
    $date: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFoodEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    foodEntriesByUserIDAndDate(
      userID: $userID
      date: $date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        food
        calories
        date
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getWeightEntry = /* GraphQL */ `
  query GetWeightEntry($id: ID!) {
    getWeightEntry(id: $id) {
      id
      userID
      weight
      date
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listWeightEntries = /* GraphQL */ `
  query ListWeightEntries(
    $filter: ModelWeightEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWeightEntries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        weight
        date
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const weightEntriesByUserIDAndDate = /* GraphQL */ `
  query WeightEntriesByUserIDAndDate(
    $userID: ID!
    $date: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelWeightEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    weightEntriesByUserIDAndDate(
      userID: $userID
      date: $date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        weight
        date
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
