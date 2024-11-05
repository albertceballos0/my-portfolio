import { useState } from 'react';
import { FaGoogle, FaGithub, FaTimes } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '@/lib/firebase';
import { useAuthStore } from '@/store/useAuthStore';
import { useModalStore } from '@/store/useModalStore';
import axios from 'axios'; // Importa Axios
import { USER_MESSAGES } from '@/constants/messages'; // Importa los mensajes
import { useMessageStore } from '@/store/useMessageStore';
import { Loader2 } from 'lucide-react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado para manejar el loading

  const { setMessage } = useMessageStore();

  const { login } = useAuthStore();
  const { closeModal } = useModalStore();

  const handleLogin = async (email : string) => {
    try {
      const response = await axios.post('api/users', { email });
      if (response.status !== 200) {
        throw new Error("Error al manejar el inicio de sesión");
      }
      console.log(response.data); // Maneja la respuesta si es necesario
      return response.data;
    } catch (error) {
      console.error("Error al manejar el inicio de sesión:", error);
      setError(USER_MESSAGES.GENERAL_ERROR); // Mensaje de error genérico
    }
  };
  
  const handleLoginCurrent = async () => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      if (user.email) {
        const data = await handleLogin(user.email); // Envía el email a la Cloud Function
        if (data.error) {
          setLoading(false);
          return;
        }
        const userData = { email: user.email || '', name: user.displayName || '', avatarUrl: user.photoURL || '' };
        login(userData); // Guarda el objeto completo en el estado global
        localStorage.setItem("user", JSON.stringify(userData)); // Guarda en localStorage
        closeModal();
        setMessage(data.message, 'success');
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError(USER_MESSAGES.GENERAL_ERROR);
      setLoading(false);
    }
  };
  
  // Función de ejemplo para handleGoogleLogin, handleGithubLogin sería similar
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (user.email) {
        const data = await handleLogin(user.email);
        if (data.error) {
          setLoading(false);
          return;
        }
        const userData = { email: user.email || '', name: user.displayName || '', avatarUrl: user.photoURL || '' };
        login(userData); // Guarda en Zustand
        localStorage.setItem("user", JSON.stringify(userData)); // Guarda en localStorage
        closeModal();
        setMessage(data.message, 'success');
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      setError(USER_MESSAGES.GENERAL_ERROR);
      setLoading(false);
    }
  };
  
  // Función para manejar login con GitHub
  const handleGithubLogin = async () => {
    try {
      setLoading(true); // Iniciar loading
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      if (user.email) {
        const data = await handleLogin(user.email); // Envía el email a la Cloud Function
        if (data.error) {
          setLoading(false); // Finalizar loading
          return;
        }
        const userData = { email: user.email || '', name: user.displayName || '', avatarUrl: user.photoURL || '' };
        login(userData); // Guarda el email en la store global
        closeModal(); // Cerrar modal tras login exitoso
        setMessage(data.message, 'success'); // Muestra mensaje de éxito
      }
    } catch (error) {
      console.error("Error al iniciar sesión con GitHub:", error);
      setError(USER_MESSAGES.GENERAL_ERROR); // Mensaje de error genérico
      setLoading(false); // Finalizar loading
    }
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      <form onSubmit={handleLoginCurrent} className="bg-white p-8 rounded-lg shadow-md">
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
                type="submit"
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
