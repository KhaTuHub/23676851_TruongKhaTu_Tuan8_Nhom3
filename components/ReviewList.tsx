import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RatingStars from './RatingStars';
import { Review } from '../types';

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return <Text style={styles.empty}>Chưa có đánh giá nào.</Text>;
  }
  return (
    <View>
      {reviews.map((r) => (
        <View key={r.id} style={styles.item}>
          <View style={styles.row}>
            <Text style={styles.name}>{r.userName}</Text>
            <RatingStars value={r.rating} size={14} />
          </View>
          {!!r.comment && <Text style={styles.comment}>{r.comment}</Text>}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  empty: { color: '#777', fontStyle: 'italic' },
  item: { paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#ddd' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontWeight: '600' },
  comment: { marginTop: 4, color: '#333' },
});