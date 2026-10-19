import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/authStore';
import { BOOKS } from '../data/books';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 20, textAlign: 'center' }}>
        {token ? `Xin chào, ${user?.name}` : 'Bạn chưa đăng nhập'}
      </Text>

      {BOOKS.map((b) => (
        <TouchableOpacity
          key={b.id}
          style={styles.card}
          onPress={() => navigation.navigate('BookDetail', { book: b })}
        >
          <Text style={styles.title}>{b.title}</Text>
          <Text style={{ color: '#666' }}>{b.author}</Text>
        </TouchableOpacity>
      ))}

      <Button title="Xem giỏ hàng" onPress={() => navigation.navigate('Cart')} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 14, borderRadius: 8 },
  title: { fontSize: 16, fontWeight: '600' },
});