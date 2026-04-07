"use client";

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface BaseProps {
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
}

interface InputProps extends BaseProps, InputHTMLAttributes<HTMLInputElement> {
  as?: "input";
}

interface TextareaProps extends BaseProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: "textarea";
  rows?: number;
}

type FormFieldProps = InputProps | TextareaProps;

const FormField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormFieldProps
>(function FormField({ label, error, required, hint, as = "input", ...props }, ref) {
  const id = props.id || props.name;
  const baseClass = `form-input ${error ? "border-red-500 focus:ring-red-500" : ""}`;

  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-500 mb-1">{hint}</p>}
      {as === "textarea" ? (
        <textarea
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          id={id}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={baseClass}
          rows={(props as TextareaProps).rows || 4}
        />
      ) : (
        <input
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
          id={id}
          ref={ref as React.Ref<HTMLInputElement>}
          className={baseClass}
        />
      )}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
});

export default FormField;
