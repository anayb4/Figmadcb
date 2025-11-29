import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E3A5F] to-[#2d5a8f] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-[#1E3A5F] rounded-lg flex items-center justify-center mb-4">
            <span className="text-white text-3xl">MQ</span>
          </div>
          <h1 className="text-[#1E3A5F] text-2xl">MobilityIQ</h1>
          <p className="text-gray-600 text-sm mt-1">Transportation Planning Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="planner@city.gov"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#1E3A5F] hover:bg-[#2d5a8f] text-white"
          >
            Sign In
          </Button>

          <div className="text-center">
            <a href="#" className="text-sm text-[#1E3A5F] hover:underline">
              Forgot password?
            </a>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
          © 2025 MobilityIQ. For authorized city personnel only.
        </div>
      </div>
    </div>
  );
}
