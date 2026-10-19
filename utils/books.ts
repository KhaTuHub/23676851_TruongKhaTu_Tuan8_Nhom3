import { Book } from '../types';

export const getRelatedBooks = (all: Book[], current: Book): Book[] =>
  all.filter((b) => b.category === current.category && b.id !== current.id);