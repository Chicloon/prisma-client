import gql from 'graphql-tag';

export const ChannelsQuery = gql`
  {
    channels {
      id
      name
      members {
        id
        member {
          id
          name
          email
        }
        role
      }
    }
  }
`;

export const meQuerry = gql`
  {
    me {
      id
      name
      channels {
        id
        member {
          id
          name
        }
      }
    }
  }
`;
