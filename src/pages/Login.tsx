import React, { useState } from 'react';
import { Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MobileContainer } from '../components/layout/MobileContainer';
import { MobileInput } from '../components/form/MobileInput';
import { PasswordInput } from '../components/form/PasswordInput';
import { GoogleSignInButton } from '../components/auth/GoogleSignInButton';
import { TouchFeedback } from '../components/ui/TouchFeedback';
import { Button } from '../components/Button';
import { Link } from '../components/Link';
import { useAuthRedirect } from '../lib/auth/hooks/useAuthRedirect';
import { validateEmail } from '../lib/auth/utils/validation';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useAuthRedirect();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate('/profile');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileContainer className="flex flex-col justify-center">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <TouchFeedback>
            <Leaf className="h-12 w-12 text-green-600 mx-auto" />
          </TouchFeedback>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Sign in to EcoSense
          </h1>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <GoogleSignInButton />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <MobileInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tim@mind.com"
              autoComplete="email"
              required
            />

            <PasswordInput
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />

            <TouchFeedback>
              <Button
                type="submit"
                loading={loading}
                className="w-full h-12 text-base"
              >
                Sign In
              </Button>
            </TouchFeedback>

            <div className="flex items-center justify-between text-sm">
              <TouchFeedback>
                <Link href="/forgot-password" className="text-green-600">
                  Forgot password?
                </Link>
              </TouchFeedback>
              <TouchFeedback>
                <Link href="/signup" className="text-green-600">
                  Create account
                </Link>
              </TouchFeedback>
            </div>
          </form>
        </div>
      </div>
    </MobileContainer>
  );
}