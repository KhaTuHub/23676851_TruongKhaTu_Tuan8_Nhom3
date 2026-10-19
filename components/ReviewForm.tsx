import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet,
} from 'react-native';
import RatingStars from './RatingStars';

interface Props {
  onSubmit: (data: { rating: number; comment: string }) => Promise<void>;
}

export default function ReviewForm({ onSubmit }: Props) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return setError('Vui lòng chọn số sao');
    if (comment.trim().length < 3) return setError('Bình luận tối thiểu 3 ký tự');
    setError('');
    try {
      setLoading(true);
      await onSubmit({ rating, comment: comment.trim() });
      setRating(0); 
      setComment('');
    } catch {
      setError('Gửi đánh giá thất bại, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.box}>
      <Text style={styles.title}>Viết đánh giá của bạn</Text>
      <RatingStars value={rating} size={32} onChange={setRating} />
      <TextInput
        style={styles.input}
        placeholder="Chia sẻ cảm nhận về cuốn sách..."
        multiline
        value={comment}
        onChangeText={(v) => { setComment(v); setError(''); }}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.btnText}>Gửi đánh giá</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { marginTop: 16 },
  title: { fontWeight: '700', marginBottom: 8, fontSize: 16 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10,
    minHeight: 80, textAlignVertical: 'top', marginTop: 10, backgroundColor: '#fff',
  },
  error: { color: '#e53935', marginTop: 6 },
  button: { backgroundColor: '#1e88e5', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: '600' },
});