import { useState } from 'react';
import { FaGoogle, FaGithub, FaTimes } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModalStore } from '@/store/useModalStore';
import { Loader2 } from 'lucide-react';
import { useLogin } from '@/hooks/useLogin';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado para manejar el loading

  const { closeModal } = useModalStore();

  const { handleAuth, handleGithubLogin, handleGoogleLogin } = useLogin(setLoading, setError);

  
  return (
    <div className="w-full max-w-md mx-auto relative">
      <form 
        className="bg-white p-8 rounded-lg shadow-md">
        <button
          onClick={() => closeModal()}
          className="absolute m-4 top-2 right-2 hover:bg-red-500 rounded-sm p-2"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-600">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <Label htmlFor="email" className="block text-gray-400 mb-2">Email</Label>
          <Input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full bg-gray-100 text-black"
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="password" className="block text-gray-400 mb-2">Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full bg-gray-100 text-black"
          />
        </div>
        <div className="flex flex-col space-y-4">
          {loading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin text-black" size={24} />
        </div>
          ) : (
        <>
          <Button
            onClick={async () => await handleAuth(email, password)}
            type="button"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white mb-4"
            disabled={loading}
          >
            Log In / Log Up
          </Button>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-gray-400">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          
          <Button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            disabled={loading}
          >
            <FaGoogle className="mr-2" /> Continue with Google
          </Button>
          <Button
            type="button"
            onClick={handleGithubLogin}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white"
            disabled={loading}
          >
            <FaGithub className="mr-2" /> Continue with GitHub
          </Button>
        </>
          )}
        </div>
      </form>
    </div>
  );
}
