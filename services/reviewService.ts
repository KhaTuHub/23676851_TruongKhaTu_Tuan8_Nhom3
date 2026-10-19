import { Review } from '../types';

const USE_MOCK = true;

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// "Cơ sở dữ liệu" giả nằm trong bộ nhớ
let mockDb: Review[] = [
  { id: 1, bookId: 1, userName: 'Lan', rating: 5, comment: 'Sách rất dễ hiểu, ví dụ rõ ràng.' },
  { id: 2, bookId: 1, userName: 'Minh', rating: 4, comment: 'Nội dung tốt, hơi dài ở phần cuối.' },
  { id: 3, bookId: 2, userName: 'Hà', rating: 3, comment: 'Ổn cho người mới bắt đầu.' },
];
let nextId = 100;

export interface CreateReviewPayload {
  userName: string;
  rating: number;
  comment: string;
}

export const reviewService = {
  getByBook: async (bookId: number): Promise<Review[]> => {
    if (USE_MOCK) {
      await delay(400);
      return mockDb.filter((r) => r.bookId === bookId);
    }
    // const res = await api.get<Review[]>(`/books/${bookId}/reviews`);
    // return res.data;
    return [];
  },

  // POST review mới, trả về review đã tạo
  create: async (bookId: number, payload: CreateReviewPayload): Promise<Review> => {
    if (USE_MOCK) {
      await delay(600);
      const created: Review = { id: nextId++, bookId, ...payload };
      mockDb = [created, ...mockDb];
      return created;
    }
    // const res = await api.post<Review>(`/books/${bookId}/reviews`, payload);
    // return res.data;
    throw new Error('Chưa cấu hình API');
  },
};