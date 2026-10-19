import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Book } from '../types';

interface Props {
  books: Book[];
  onPressBook: (book: Book) => void;
}

export default function RelatedBooks({ books, onPressBook }: Props) {
  if (books.length === 0) return null; // không có sách liên quan thì ẩn cả mục

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Sách liên quan</Text>
      <FlatList
        data={books}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => onPressBook(item)}>
            <View style={styles.cover}>
              <Text style={styles.coverText}>{item.title.charAt(0)}</Text>
            </View>
            <Text numberOfLines={2} style={styles.name}>{item.title}</Text>
            <Text numberOfLines={1} style={styles.author}>{item.author}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 24 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
  card: { width: 120, marginRight: 12 },
  cover: {
    width: 120, height: 160, borderRadius: 8, backgroundColor: '#1e88e5',
    justifyContent: 'center', alignItems: 'center',
  },
  coverText: { color: '#fff', fontSize: 40, fontWeight: '700' },
  name: { marginTop: 6, fontSize: 14, fontWeight: '600' },
  author: { fontSize: 12, color: '#666', marginTop: 2 },
});