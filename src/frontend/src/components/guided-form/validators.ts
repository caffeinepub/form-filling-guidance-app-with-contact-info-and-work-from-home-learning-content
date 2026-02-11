import type { FieldDefinition, FormData, ValidationResult } from './types';

export function validateField(field: FieldDefinition, value: string): string | null {
  if (field.required && !value.trim()) {
    return `${field.label} is required`;
  }

  if (value.trim()) {
    if (field.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }

    if (field.type === 'tel') {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
        return 'Please enter a valid phone number';
      }
    }
  }

  return null;
}

export function validateForm(fields: FieldDefinition[], formData: FormData): ValidationResult {
  const errors: { [key: string]: string } = {};

  fields.forEach((field) => {
    const error = validateField(field, formData[field.id] || '');
    if (error) {
      errors[field.id] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
