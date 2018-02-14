import gql from 'graphql-tag';

export const ChannelsQuery = gql`
  {
    channels {
      id
      name
      owner {
        id
      }
      members {
        name {
          id
        }
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
