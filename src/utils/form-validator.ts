const PASSWORD_LENGTH_LIMIT = 4;

class FormValidator {
  validateUsername(value: string) {
    const trimmed = value.trim();

    if (!trimmed) {
      return 'Username is required';
    }

    return null;
  }

  validateEmail(value: string) {
    const trimmed = value.trim();

    if (!trimmed) {
      return 'Email is required';
    }

    if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
      return 'Invalid email address';
    }

    return null;
  }

  validatePassword(value: string) {
    if (!value) {
      return 'Password is required';
    }

    if (value.length < PASSWORD_LENGTH_LIMIT) {
      return `Password must be at least ${PASSWORD_LENGTH_LIMIT} characters`;
    }

    return null;
  }

  validateConfirmPassword(passwordToConfirm: string, password: string) {
    if (!passwordToConfirm) {
      return 'Please confirm your password';
    }

    if (passwordToConfirm !== password) {
      return 'Passwords do not match';
    }

    return null;
  }
}

export const FormValidatorInstance = new FormValidator();
