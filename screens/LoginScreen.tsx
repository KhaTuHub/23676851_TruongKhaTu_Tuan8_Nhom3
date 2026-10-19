import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import FormInput from '../components/FormInput';
import { validateEmail, validatePassword } from '../utils/validators';
import { authService, getErrorMessage } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import { useAuthRedirect } from '../utils/useAuthRedirect';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

interface LoginForm { email: string; password: string }
type LoginErrors = Partial<Record<keyof LoginForm, string>>;

export default function LoginScreen({ navigation, route }: Props) {
  const redirectTo = route.params?.redirectTo;
  const book = route.params?.book;
  const goAfterAuth = useAuthRedirect(route.params);
  const setAuth = useAuthStore((s) => s.setAuth);
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);

  const onChange = (key: keyof LoginForm, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  const validate = (): boolean => {
    const next: LoginErrors = {
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    };
    setErrors(next);
    return !next.email && !next.password;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      const data = await authService.login(form.email.trim(), form.password);
      await setAuth(data);
      goAfterAuth(); // Checkout / BookDetail / Home tùy redirectTo
    } catch (err) {
      Alert.alert('Đăng nhập thất bại', getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <FormInput
        placeholder="Email"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(v) => onChange('email', v)}
        error={errors.email}
      />
      <FormInput
        placeholder="Mật khẩu"
        secureTextEntry
        value={form.password}
        onChangeText={(v) => onChange('password', v)}
        error={errors.password}
      />

      <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Đăng nhập</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register', { redirectTo, book })}>
        <Text style={styles.link}>Chưa có tài khoản? Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 24, textAlign: 'center' },
  button: { backgroundColor: '#1e88e5', padding: 14, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  link: { color: '#1e88e5', textAlign: 'center', marginTop: 16 },
});