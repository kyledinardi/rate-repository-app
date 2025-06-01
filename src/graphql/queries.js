import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query repositories {
    repositories {
      edges {
        node {
          id
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
    }
  }
`;

export const ME = gql`
  query me {
    me {
      id
      username
    }
  }
`;
