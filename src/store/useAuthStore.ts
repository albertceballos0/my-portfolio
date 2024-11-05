import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface userInterface {
  email: string;
  avatarUrl: string;
  name: string;
}

interface AuthState {
  user: userInterface | null;
  isLoggedIn: boolean;
  isInitialized: boolean;
  login: (user: userInterface) => void;
  logout: () => void;
}



export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      isInitialized: false,

      // Función para iniciar sesión
      login: (userData) => set({ user: userData, isLoggedIn: true }), // Almacena el objeto completo

      // Función para cerrar sesión
      logout: () => set(() => ({ user: null, isLoggedIn: false })),

    }),
    {
      name: 'auth-storage', // Nombre para el local storage
      // Actualizamos el estado de inicialización cuando se recarguen los datos del localStorage
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isInitialized = true;
        }
      },
    }
  )
);
