import React from 'react';
import {} from 'semantic-ui-react';
import { graphql, compose } from 'react-apollo';

import { ChannelsQuery } from '../graphql/querries';

const CreateChannel = ({ data: { loading, channels } }) => {
  if (loading) {
    return null;
  }
  return (
    <div style={{ padding: '12px' }}>
      <ul>{channels.map(channel => <li key={`channel-${channel.id}`}> {channel.name}</li>)}</ul>
    </div>
  );
};

// const ChannelsQuery = gql`
//   {
//     channels {
//       id
//       name
//       owner {
//         id
//       }
//       members {
//         name {
//           id
//         }
//       }
//     }
//   }
// `;

export default compose(graphql(ChannelsQuery))(CreateChannel);