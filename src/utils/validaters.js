const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateUser(fields, type="login") {
  const errors = {};

  if (type === "signup") {
    if (!fields.name || !fields.name.trim().length) {
      errors.name = "Name is required";
    }
  }

  if (
    !fields.email ||
    !fields.email.trim().length ||
    !emailRegex.test(fields.email)
  ) {
    errors.email = "Valid email is required";
  }

  if (!fields.password || fields.password.trim().length < 4) {
    errors.password = "Password must be at least 4 characters";
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}
