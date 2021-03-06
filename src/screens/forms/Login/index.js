import React, { useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { useFormik } from 'formik';
import { post } from '../../../services/api';
import { LoginSchema } from '../../../shared/schemas';
import { capitalize } from '../../../shared/utils';
import { Field, FormButton } from '../../../shared/components';
import { AuthContext } from '../../../../App';
import { formStyles } from '../styles';
import styles from './styles';

const loginIcon = require('../../../assets/login-icon.png');

const INITIAL_FORM = {
  username: '',
  password: ''
};

export function Login({ navigation }) {

  const { writeToken } = useContext(AuthContext);

  const toLogupForm = () => { navigation.navigate('logup') };

  const submitHandler = async data => {
    if (isValid) {
      let { errors, response } = await post('/login', data);
      if (errors) {
        if (errors.invalid) {
          setStatus({ error: errors.message });
        } else {
          alert('Something went wrong, try again later.');
        };
      } else {
        await writeToken(response.token);
      };
    };
  };

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    isValid,
    setStatus,
    status,
    isSubmitting
  } = useFormik({
    initialValues: INITIAL_FORM,
    validationSchema: LoginSchema,
    onSubmit: submitHandler
  });

  const fieldProps = name => ({
    placeholder: capitalize(name),
    value: values[name],
    error: errors[name],
    touched: touched[name],
    onBlur: handleBlur(name),
    onChange: handleChange(name)
  });

  return (
    <View style={formStyles.form}>
      <Image source={loginIcon} style={formStyles.formImage}/>
      <Text style={formStyles.formText}>
        Complete with your credentials
      </Text>
      <Text style={styles.errorText}>{ status?.error }</Text>
      <Field {...fieldProps('username')} pattern={/^[a-z0-9_]*$/}/>
      <Field {...fieldProps('password')}/>
      <FormButton
        text="Submit"
        onPress={handleSubmit}
        disabled={!isValid}
        isLoading={isSubmitting}
      />
      <Text style={formStyles.formAnchorText}>
        Still not registered? {''}
        <Text style={formStyles.formAnchor} onPress={toLogupForm}>
          Let's do it!
        </Text>
      </Text>
    </View>
  );

};