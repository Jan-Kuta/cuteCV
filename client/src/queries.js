import gql from 'graphql-tag';

export const MeQuery = gql`
  query {
    me {
      _id
      username
      displayName
      photoUrl
    }
  }
`;