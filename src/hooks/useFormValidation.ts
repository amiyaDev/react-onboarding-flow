import { useCallback, useState } from 'react';
import type { Validator } from '../utils/validators';

export type ValidationSchema<T> = Partial<Record<keyof T, Validator>>;

export function useFormValidation<T extends object>(schema: ValidationSchema<T>) {
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = useCallback(
    (field: keyof T, value: string) => {
      const validator = schema[field];
      const error = validator ? validator(value) : undefined;
      setErrors((prev) => ({ ...prev, [field]: error }));
      return error;
    },
    [schema],
  );

  const handleBlur = useCallback(
    (field: keyof T, value: string) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      validateField(field, value);
    },
    [validateField],
  );

  const validateAll = useCallback(
    (values: Record<keyof T, string>) => {
      const fields = Object.keys(schema) as (keyof T)[];
      const newErrors: Partial<Record<keyof T, string>> = {};
      let isValid = true;

      fields.forEach((field) => {
        const validator = schema[field];
        const error = validator ? validator(values[field]) : undefined;
        if (error) isValid = false;
        newErrors[field] = error;
      });

      setErrors(newErrors);
      setTouched(fields.reduce((acc, field) => ({ ...acc, [field]: true }), {} as Partial<Record<keyof T, boolean>>));
      return isValid;
    },
    [schema],
  );

  const getError = useCallback(
    (field: keyof T) => (touched[field] ? errors[field] : undefined),
    [errors, touched],
  );

  const resetValidation = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  return { errors, touched, validateField, handleBlur, validateAll, getError, resetValidation };
}
