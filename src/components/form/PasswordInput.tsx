import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { TouchFeedback } from '../ui/TouchFeedback';

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
}

export function PasswordInput({ 
  label, 
  error, 
  className = '', 
  ...props 
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          type={showPassword ? 'text' : 'password'}
          className={`
            w-full px-4 py-3 pr-12 rounded-lg border border-gray-300
            focus:ring-2 focus:ring-green-500 focus:border-green-500
            text-base appearance-none
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          style={{ 
            minHeight: '48px',
            WebkitAppearance: 'none'
          }}
        />
        <TouchFeedback>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </TouchFeedback>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}