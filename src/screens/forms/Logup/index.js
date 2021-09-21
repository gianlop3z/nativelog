import React from 'react';
import { Image, Text, View } from 'react-native';
import { Field } from '../../../shared/components/Field';
import { FormButton } from '../../../shared/components/FormButton';
import { formStyles } from '../styles';

const logupIcon = require('../../../assets/logup-icon.png');

export function Logup() {
  return (
    <View style={formStyles.form}>
      <Image source={logupIcon} style={formStyles.formImage}/>
      <Text style={formStyles.formText}>
        Fill the form to continue
      </Text>
      <Field placeholder="Name"/>
      <Field placeholder="Email"/>
      <Field placeholder="Username"/>
      <Field placeholder="Password"/>
      <FormButton/>
      <Text style={formStyles.formAnchorText}>
        Already registered? {''}
        <Text style={formStyles.formAnchor}>
          Log in!
        </Text>
      </Text>
    </View>
  );
};