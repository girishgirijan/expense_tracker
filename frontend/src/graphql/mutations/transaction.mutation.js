import { gql } from "@apollo/client";

//Mutation to create transaction
export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($input: CreateTranscationInput!) {
    createTranscation(input: $input) {
      _id
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;

//Mutation to update transaction
export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($input: UpdateTranscationInput!) {
    updateTranscation(input: $input) {
      _id
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;

//Mutation to delete transaction
export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($transactionId: ID!) {
    deleteTranscation(transactionId: $transactionId) {
      _id      
    }
  }
`;
