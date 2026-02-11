export type FormType = 'job-application' | 'survey' | 'registration';

export interface FieldDefinition {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required: boolean;
  tip: string;
  example: string;
  options?: string[];
}

export interface FormTemplate {
  id: FormType;
  title: string;
  description: string;
  fields: FieldDefinition[];
}

export interface FormData {
  [key: string]: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}
