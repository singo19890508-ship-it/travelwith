"use client";

import { forwardRef, SelectHTMLAttributes } from "react";

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  function FormSelect({ label, error, required, options, placeholder, ...props }, ref) {
    const id = props.id || props.name;
    return (
      <div>
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select
          {...props}
          id={id}
          ref={ref}
          className={`form-input bg-white ${error ? "border-red-500 focus:ring-red-500" : ""} ${props.className || ""}`}
        >
          {placeholder && (
            <option value="">{placeholder}</option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="form-error">{error}</p>}
      </div>
    );
  }
);

export default FormSelect;
