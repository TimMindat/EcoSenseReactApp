import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { TouchFeedback } from '../ui/TouchFeedback';

interface MobileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function MobileInput({ 
  label, 
  error, 
  className = '', 
  type = 'text',
  ...props 
}: MobileInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const getInputType = () => {
    if (!isPassword) return type;
    return showPassword ? 'text' : 'password';
  };

  const inputMode = React.useMemo(() => {
    switch (type) {
      case 'email': return 'email';
      case 'tel': return 'tel';
      case 'number': return 'numeric';
      default: return 'text';
    }
  }, [type]);

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          type={getInputType()}
          inputMode={inputMode}
          className={`
            w-full px-4 py-3 rounded-lg border border-gray-300
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
        {isPassword && (
          <TouchFeedback>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </TouchFeedback>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}