import React from 'react';
import { Input, Button, Message } from 'semantic-ui-react';
import styled from 'styled-components';
import { withFormik } from 'formik';
import Yup from 'yup';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

// import { ChannelsQuery } from '../graphql/querries';

const CreateChannelButtonsWrapper = styled.div`
  padding-bottom: 12;
  display: flex;
  justify-content: space-around;
`;

const CreateChannel = ({
  open,
  onClose,
  values,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  dirty,
  resetForm,
}) => {
  const errorsValues = Object.values(errors);

  // const closeAndReset = () => {
  //   resetForm();
  //   onClose();
  // };

  return (
    <div style={{ padding: '12px' }}>
      <form onSubmit={handleSubmit}>
        <Input
          autoFocus
          fluid
          placeholder="New channel name"
          id="channelName"
          name="channelName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.channelName}
          error={!!errors.channelName}
        />
        {errorsValues.length !== 0 && (
          <Message negative>
            <ul style={{ listStyle: 'none' }}>
              {errorsValues.map(error => <li key={error}>{error}</li>)}
            </ul>
          </Message>
        )}
        <CreateChannelButtonsWrapper>
          <Button
            disabled={errorsValues.length !== 0}
            primary
            style={{ width: '50%', marginTop: '12px' }}
            type="submit"
          >
            Create
          </Button>
        </CreateChannelButtonsWrapper>
      </form>
    </div>
  );
};

const createChannelMutation = gql`
  mutation($name: String!) {
    createChannel(name: $name) {
      name
      id
    }
  }
`;

export default compose(
  graphql(createChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ channelName: '' }),
    validateOnBlur: false,
    validationSchema: Yup.object().shape({
      channelName: Yup.string()
        .required('Channel name is required!')
        /* eslint-disable no-template-curly-in-string */
        .min(5, 'Channel name must be a least ${min} chars long')
        .max(20, 'Channel name must be less then ${max} chars long'),
    }),

    handleSubmit: async (
      values,
      {
        props: { mutate, onClose }, setSubmitting, setErrors, resetForm,
      },
    ) => {
      await mutate({
        variables: { name: values.channelName },
        // update: (store, { data: { createChannel } }) => {
        //   const { ok, channel } = createChannel;
        //   if (!ok) {
        //     return;
        //   }

        //   const data = store.readQuery({ query: MeQuerry });
        //   data.me.channels.push(channel);
        //   store.writeQuery({ query: MeQuerry, data });
        // },
      }).catch((error) => {
        console.log(error);
        // setErrors({ submit:  });
      });

      // const { ok, errors } = response.data.createChannel;
      // if (ok) {
      //   onClose();
      //   resetForm();
      //   setSubmitting(false);
      // } else {
      //   setErrors(normalizeErrors(errors));
      // }
      setSubmitting(false);
    },
  }),
)(CreateChannel);
