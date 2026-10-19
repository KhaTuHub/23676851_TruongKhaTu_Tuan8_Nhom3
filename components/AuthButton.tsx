import React, { useState } from 'react';
import { TouchableOpacity, Text, Modal, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/authStore';
import { RootStackParamList } from '../types';

export default function AuthButton() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const token = useAuthStore((s) => s.token);
  const logout = useAuthStore((s) => s.logout);
  const [visible, setVisible] = useState(false);

  const doLogout = async () => {
    setVisible(false);
    await logout();
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  };

  if (!token) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.btn}
      >
        <Text style={{ color: '#1e88e5', fontSize: 16 }}>Đăng nhập</Text>
      </TouchableOpacity>
    );
  }

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.btn}>
        <Text style={{ color: '#e53935', fontSize: 16 }}>Đăng xuất</Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.box}>
            <Text style={styles.title}>Đăng xuất</Text>
            <Text style={styles.msg}>Bạn có chắc muốn đăng xuất?</Text>
            <View style={styles.row}>
              <TouchableOpacity style={styles.cancel} onPress={() => setVisible(false)}>
                <Text style={styles.cancelText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirm} onPress={doLogout}>
                <Text style={styles.confirmText}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  btn: { paddingHorizontal: 8 },
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center', alignItems: 'center', padding: 24,
  },
  box: { width: '100%', maxWidth: 320, backgroundColor: '#fff', borderRadius: 12, padding: 20 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 6 },
  msg: { fontSize: 15, color: '#444', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },
  cancel: { paddingVertical: 10, paddingHorizontal: 16 },
  cancelText: { color: '#555', fontSize: 16 },
  confirm: { backgroundColor: '#e53935', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
  confirmText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});