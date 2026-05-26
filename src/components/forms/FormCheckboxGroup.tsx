"use client";

interface Option {
  value: string;
  label: string;
}

interface FormCheckboxGroupProps {
  label: string;
  options: Option[];
  values: string[];
  onChange: (values: string[]) => void;
  error?: string;
  required?: boolean;
  columns?: 2 | 3;
}

export default function FormCheckboxGroup({
  label,
  options,
  values,
  onChange,
  error,
  required,
  columns = 2,
}: FormCheckboxGroupProps) {
  const toggle = (value: string) => {
    if (values.includes(value)) {
      onChange(values.filter((v) => v !== value));
    } else {
      onChange([...values, value]);
    }
  };

  return (
    <div>
      <span className="form-label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>
      <div className={`grid grid-cols-1 sm:grid-cols-${columns} gap-2 mt-1`}>
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              checked={values.includes(opt.value)}
              onChange={() => toggle(opt.value)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{opt.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
