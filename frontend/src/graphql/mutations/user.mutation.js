import { gql } from "@apollo/client";

//Mutation for signup
export const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      _id
      name
      username
    }
  }
`;

//Mutation for login
export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      _id
      name
      username
    }
  }
`;

//Mutation for logout
export const LOGOUT = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;
