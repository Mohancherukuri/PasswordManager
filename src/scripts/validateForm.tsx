import {
  PasswordDataTypeWithId,
  PasswordDataType,
} from '../@types/PasswordDataType';

export const validateForm = ({
  userName,
  password,
  email,
  appName,
}: PasswordDataType | PasswordDataTypeWithId) => {
  if (!userName && !email) {
    return 'Either Username or Email is required.';
  }

  
  if (userName && userName.trim() === '') {
    return 'Username cannot be empty if provided.';
  }

  if (userName && userName.length > 50) {
    return 'Username cannot exceed 50 characters.';
  }

  if (email && email.trim() === '') {
    return 'Email cannot be empty if provided.';
  }

  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Email is invalid.';
    }
  }

  if (password && password.length < 6 || password.length === 0) {
    return 'Password must be at least 6 characters long.';
  }

  if (appName && appName.trim() === '' || appName.length === 0) {
    return 'App Name cannot be empty.';
  }
  return null;
};
