/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
export const onCreateFoodEntry = /* GraphQL */ `
  subscription OnCreateFoodEntry(
    $filter: ModelSubscriptionFoodEntryFilterInput
    $owner: String
  ) {
    onCreateFoodEntry(filter: $filter, owner: $owner) {
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
export const onUpdateFoodEntry = /* GraphQL */ `
  subscription OnUpdateFoodEntry(
    $filter: ModelSubscriptionFoodEntryFilterInput
    $owner: String
  ) {
    onUpdateFoodEntry(filter: $filter, owner: $owner) {
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
export const onDeleteFoodEntry = /* GraphQL */ `
  subscription OnDeleteFoodEntry(
    $filter: ModelSubscriptionFoodEntryFilterInput
    $owner: String
  ) {
    onDeleteFoodEntry(filter: $filter, owner: $owner) {
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
export const onCreateWeightEntry = /* GraphQL */ `
  subscription OnCreateWeightEntry(
    $filter: ModelSubscriptionWeightEntryFilterInput
    $owner: String
  ) {
    onCreateWeightEntry(filter: $filter, owner: $owner) {
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
export const onUpdateWeightEntry = /* GraphQL */ `
  subscription OnUpdateWeightEntry(
    $filter: ModelSubscriptionWeightEntryFilterInput
    $owner: String
  ) {
    onUpdateWeightEntry(filter: $filter, owner: $owner) {
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
export const onDeleteWeightEntry = /* GraphQL */ `
  subscription OnDeleteWeightEntry(
    $filter: ModelSubscriptionWeightEntryFilterInput
    $owner: String
  ) {
    onDeleteWeightEntry(filter: $filter, owner: $owner) {
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
