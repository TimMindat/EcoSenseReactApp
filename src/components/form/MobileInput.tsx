import React from 'react';

interface MobileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function MobileInput({ label, error, className = '', ...props }: MobileInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        {...props}
        className={`
          w-full px-4 py-3 rounded-lg border border-gray-300
          focus:ring-2 focus:ring-green-500 focus:border-green-500
          text-base
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        style={{ 
          minHeight: '44px',
          WebkitAppearance: 'none'
        }}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}