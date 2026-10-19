import { Book } from '../types';

// Cùng danh mục, trừ sách hiện tại
export const getRelatedBooks = (all: Book[], current: Book): Book[] =>
  all.filter((b) => b.category === current.category && b.id !== current.id);