export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  category: string;
}

export interface Review {
  id: number;
  bookId: number;
  userName: string;
  rating: number;
  comment: string;
}

export type RedirectTarget = 'Checkout' | 'BookDetail';

export interface AuthRedirectParams {
  redirectTo?: RedirectTarget;
  book?: Book; 
}

export type RootStackParamList = {
  Login: AuthRedirectParams | undefined;
  Register: AuthRedirectParams | undefined;
  Home: undefined;
  Cart: undefined;
  Checkout: undefined;
  BookDetail: { book: Book };
};