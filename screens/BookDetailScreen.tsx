import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RatingStars from '../components/RatingStars';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import RelatedBooks from '../components/RelatedBooks';
import { calcAverage } from '../utils/rating';
import { getRelatedBooks } from '../utils/books';
import { BOOKS } from '../data/books';
import { reviewService } from '../services/reviewService';
import { useAuthStore } from '../store/authStore';
import { Review, RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'BookDetail'>;

export default function BookDetailScreen({ route, navigation }: Props) {
  const { book } = route.params;
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    let active = true;
    setLoadingReviews(true);
    (async () => {
      try {
        const data = await reviewService.getByBook(book.id);
        if (active) setReviews(data);
      } finally {
        if (active) setLoadingReviews(false);
      }
    })();
    return () => { active = false; };
  }, [book.id]);

  const average = useMemo(() => calcAverage(reviews), [reviews]);

  // (1) Thêm: sách cùng danh mục, trừ sách hiện tại
  const related = useMemo(() => getRelatedBooks(BOOKS, book), [book]);

  const handleSubmitReview = async ({ rating, comment }: { rating: number; comment: string }) => {
    const created = await reviewService.create(book.id, {
      userName: user?.name ?? 'Ẩn danh',
      rating,
      comment,
    });
    setReviews((prev) => [created, ...prev]);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }} style={{ backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 22, fontWeight: '700' }}>{book.title}</Text>
      <Text style={{ color: '#666', marginTop: 4 }}>{book.author} · {book.category}</Text>
      <Text style={{ marginTop: 12, lineHeight: 22 }}>{book.description}</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
        <RatingStars value={average} size={22} />
        <Text style={{ marginLeft: 8, fontSize: 16 }}>
          {average.toFixed(1)} ({reviews.length} đánh giá)
        </Text>
      </View>

      <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 20, marginBottom: 6 }}>
        Đánh giá
      </Text>
      {loadingReviews ? <ActivityIndicator /> : <ReviewList reviews={reviews} />}

      {token ? (
        <ReviewForm onSubmit={handleSubmitReview} />
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate('Login', { redirectTo: 'BookDetail', book })}
        >
          <Text style={{ color: '#1e88e5', marginTop: 16, fontSize: 16 }}>
            Đăng nhập để viết đánh giá
          </Text>
        </TouchableOpacity>
      )}

      {/* (2) Thêm: hàng ngang Sách liên quan ở cuối trang */}
      <RelatedBooks
        books={related}
        onPressBook={(b) => navigation.push('BookDetail', { book: b })}
      />
    </ScrollView>
  );
}