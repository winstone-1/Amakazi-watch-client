export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhoneNumber = (phone) => {
  // Matches +254..., 07..., 01... Kenyan phone numbers
  const re = /^(?:\+254|0)[17]\d{8}$/;
  return re.test(String(phone).trim());
};

export const validatePassword = (password) => {
  // Minimum 8 characters, at least one letter and one number
  return password && password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password);
};
