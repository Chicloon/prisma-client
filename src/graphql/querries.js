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

export const none = '';
