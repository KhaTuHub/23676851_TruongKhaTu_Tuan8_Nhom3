const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (v: string): string => {
  if (!v.trim()) return 'Vui lòng nhập email';
  if (!EMAIL_REGEX.test(v.trim())) return 'Email không đúng định dạng';
  return '';
};

export const validatePassword = (v: string): string => {
  if (!v) return 'Vui lòng nhập mật khẩu';
  if (v.length < 6) return 'Mật khẩu tối thiểu 6 ký tự';
  return '';
};

export const validateName = (v: string): string =>
  v.trim() ? '' : 'Vui lòng nhập họ tên';

export const validateConfirm = (p: string, c: string): string =>
  p === c ? '' : 'Mật khẩu nhập lại không khớp';