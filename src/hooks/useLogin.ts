import { useAuthStore } from "@/store/useAuthStore";
import { useMessageStore } from "@/store/useMessageStore";
import { useModalStore } from "@/store/useModalStore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "@/lib/firebase";
import { handleLogin } from "@/utils/api";

/**
 * Custom hook for handling user login with different providers.
 *
 * @param setLoading - Function to set the loading state.
 * @param setError - Function to set the error state.
 * @returns An object containing functions to handle login with email/password, Google, and GitHub.
 */
export const useLogin = (setLoading : (loading: boolean) => void , setError : (error : string) => void) => {

    const { login} = useAuthStore();
    const { setMessage } = useMessageStore();
    const { closeModal } = useModalStore();

    const handleAuth = async (email: string, password: string) => {

        if (!email || !password) {
            setError("Por favor, completa todos los campos.");
            setLoading(false);
            return;
        }
        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            let type = 0;
            try {
                // Intentar iniciar sesión con email y password
                await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
                // Si el error indica que el usuario no existe, proceder con el registro

                console.log("User not found, registering...", error);
                try {
                    await createUserWithEmailAndPassword(auth, email, password);
                    type = 1;
                } catch (error) {
                    console.error("Error al registrar usuario:", error);                    
                    setError("Error de autenticación. Por favor verifica tus credenciales.");
                    setLoading(false);
                    return;
                }

            }

            try{
                await handleLogin(email);
                // Crear objeto con los datos del usuario
                const userData = {
                    email: email || '',
                    name:  '',
                    avatarUrl: '',
                };

                // Guardar el email en auth store
                login(userData);
                // Cerrar modal y mostrar mensaje de éxito
                closeModal();
                if (type === 0) setMessage("Inicio de sesión exitoso", 'success');
                else setMessage("Registro exitoso", 'success');
            }
            catch (error) {
                console.error("Error al manejar el inicio de sesión en BD:", error);
                setError("Error en la autenticación. Por favor intenta nuevamente.");
            }            

        } catch (error) {
            console.error("Error en la autenticación:", error);
            setError("Error en la autenticación. Por favor intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };
    
  
  // Función de ejemplo para handleGoogleLogin, handleGithubLogin sería similar
  const handleGoogleLogin = async () => {
    try {
      // Iniciar loading
      setLoading(true);
      // Iniciar sesión con Google
      const result = await signInWithPopup(auth, googleProvider);
      // Extraer el usuario
      const user = result.user;
      if (user.email) {
        // Enviar el email a la api para registrar usuario si no existe
        const data = await handleLogin(user.email);
        if (data.error) {
          setLoading(false);
          return;
        }
        // Crear objeto con los datos del usuario
        const userData = { email: user.email || '', name: user.displayName || '', avatarUrl: user.photoURL || '' };
        login(userData); // Guarda en estado global

        // Cerrar modal
        closeModal();
        // Mostrar mensaje de éxito
        setMessage(data.message, 'success');
      }
      setLoading(false);
      setError("Error en el inicio de sesión. Por favor intenta nuevamente.");
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      setError("Error en el inicio de sesión. Por favor intenta nuevamente.");
      setLoading(false);
    }
  };
  
  // Función para manejar login con GitHub
  const handleGithubLogin = async () => {
    try {
      // Iniciar loading
      setLoading(true);
      // Iniciar sesión con GitHub
      const result = await signInWithPopup(auth, githubProvider);

      // Extraer el usuario de la respuesta
      const user = result.user;
      if (user.email) {
        // Enviar el email a la api para registrar usuario si no existe
        const data = await handleLogin(user.email); // Envía el email a la Cloud Function
        if (data.error) {
          setLoading(false); // Finalizar loading
          return;
        }

        // Crear objeto con los datos del usuario
        const userData = { email: user.email || '', name: user.displayName || '', avatarUrl: user.photoURL || '' };
        login(userData); // Guarda el email en auth store
        closeModal(); // Cerrar modal tras login exitoso
        setMessage(data.message, 'success'); // Muestra mensaje de éxito
      }
      setLoading(false); // Finalizar loading
      setError("Error en el inicio de sesión. Por favor intenta nuevamente."); // Mensaje de error genérico
    } catch (error) {
      console.error("Error al iniciar sesión con GitHub:", error);
      setError("Error en el inicio de sesión. Por favor intenta nuevamente."); // Mensaje de error genérico
      setLoading(false); // Finalizar loading
    }
  };


    return {
        handleAuth,
        handleGoogleLogin,
        handleGithubLogin
    }
}; 