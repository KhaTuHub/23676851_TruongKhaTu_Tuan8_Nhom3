import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/authStore';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

export default function CartScreen({ navigation }: Props) {
  const token = useAuthStore((s) => s.token);

  const onCheckout = () => {
    if (!token) {
      
      navigation.navigate('Login', { redirectTo: 'Checkout' });
      return;
    }
    navigation.navigate('Checkout');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Giỏ hàng (demo)</Text>
      <TouchableOpacity style={styles.button} onPress={onCheckout}>
        <Text style={styles.btnText}>Thanh toán</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
  text: { fontSize: 18 },
  button: { backgroundColor: '#1e88e5', paddingVertical: 12, paddingHorizontal: 32, borderRadius: 8 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});