/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createFoodEntry = /* GraphQL */ `
  mutation CreateFoodEntry(
    $input: CreateFoodEntryInput!
    $condition: ModelFoodEntryConditionInput
  ) {
    createFoodEntry(input: $input, condition: $condition) {
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
export const updateFoodEntry = /* GraphQL */ `
  mutation UpdateFoodEntry(
    $input: UpdateFoodEntryInput!
    $condition: ModelFoodEntryConditionInput
  ) {
    updateFoodEntry(input: $input, condition: $condition) {
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
export const deleteFoodEntry = /* GraphQL */ `
  mutation DeleteFoodEntry(
    $input: DeleteFoodEntryInput!
    $condition: ModelFoodEntryConditionInput
  ) {
    deleteFoodEntry(input: $input, condition: $condition) {
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
export const createWeightEntry = /* GraphQL */ `
  mutation CreateWeightEntry(
    $input: CreateWeightEntryInput!
    $condition: ModelWeightEntryConditionInput
  ) {
    createWeightEntry(input: $input, condition: $condition) {
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
export const updateWeightEntry = /* GraphQL */ `
  mutation UpdateWeightEntry(
    $input: UpdateWeightEntryInput!
    $condition: ModelWeightEntryConditionInput
  ) {
    updateWeightEntry(input: $input, condition: $condition) {
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
export const deleteWeightEntry = /* GraphQL */ `
  mutation DeleteWeightEntry(
    $input: DeleteWeightEntryInput!
    $condition: ModelWeightEntryConditionInput
  ) {
    deleteWeightEntry(input: $input, condition: $condition) {
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
