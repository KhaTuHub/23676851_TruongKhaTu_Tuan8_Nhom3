import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import FormInput from '../components/FormInput';
import {
  validateEmail, validatePassword, validateName, validateConfirm,
} from '../utils/validators';
import { authService, getErrorMessage } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import { useAuthRedirect } from '../utils/useAuthRedirect';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

interface RegisterForm { name: string; email: string; password: string; confirm: string }
type RegisterErrors = Partial<Record<keyof RegisterForm, string>>;

export default function RegisterScreen({ navigation, route }: Props) {
  const redirectTo = route.params?.redirectTo;
  const book = route.params?.book;
  const goAfterAuth = useAuthRedirect(route.params);
  const setAuth = useAuthStore((s) => s.setAuth);
  const [form, setForm] = useState<RegisterForm>({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [loading, setLoading] = useState(false);

  const onChange = (key: keyof RegisterForm, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  const validate = (): boolean => {
    const next: RegisterErrors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      confirm: validateConfirm(form.password, form.confirm),
    };
    setErrors(next);
    return Object.values(next).every((m) => !m);
  };

  const onSubmit = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      const data = await authService.register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      await setAuth(data);
      goAfterAuth(); // Checkout / BookDetail / Home tùy redirectTo
    } catch (err) {
      Alert.alert('Đăng ký thất bại', getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>

      <FormInput placeholder="Họ tên" autoCapitalize="words"
        value={form.name} onChangeText={(v) => onChange('name', v)} error={errors.name} />
      <FormInput placeholder="Email" keyboardType="email-address"
        value={form.email} onChangeText={(v) => onChange('email', v)} error={errors.email} />
      <FormInput placeholder="Mật khẩu" secureTextEntry
        value={form.password} onChangeText={(v) => onChange('password', v)} error={errors.password} />
      <FormInput placeholder="Nhập lại mật khẩu" secureTextEntry
        value={form.confirm} onChangeText={(v) => onChange('confirm', v)} error={errors.confirm} />

      <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Tạo tài khoản</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login', { redirectTo, book })}>
        <Text style={styles.link}>Đã có tài khoản? Đăng nhập</Text>
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