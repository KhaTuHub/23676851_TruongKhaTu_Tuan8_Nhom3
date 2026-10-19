import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  error?: string;
}

export default function FormInput({ error, ...props }: Props) {
  return (
    <View style={styles.wrap}>
      <TextInput
        style={[styles.input, !!error && styles.inputError]}
        placeholderTextColor="#999"
        autoCapitalize="none"
        {...props}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 14 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 10, fontSize: 16,
  },
  inputError: { borderColor: '#e53935' },
  error: { color: '#e53935', marginTop: 4, fontSize: 13 },
});