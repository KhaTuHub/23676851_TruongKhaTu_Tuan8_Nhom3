import { Review } from '../types';

// Điểm trung bình, làm tròn 1 chữ số (vd 4.3). Không có review -> 0.
export const calcAverage = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((total, r) => total + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};