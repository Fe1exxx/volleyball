import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { z } from 'zod';

const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  role: z.enum(['user', 'admin']), // строгий enum
});

type User = z.infer<typeof userSchema>;

interface AuthState {
  isLoggedIn: boolean;
  currentUser: User | null;
  users: User[];
  loading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loadUsers: () => Promise<void>;
  isAdmin: () => boolean; 
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      currentUser: null,
      users: [],
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
          const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });

          const data = await response.json();

          if (!response.ok) {
            set({ error: data.error || 'Ошибка входа', loading: false });
            return;
          }

          // Валидация ответа
          const user = userSchema.parse(data.user);
          
          set({
            isLoggedIn: true,
            currentUser: user,
            loading: false
          });
        } catch (err) {
          set({ error: 'Ошибка соединения', loading: false });
        }
      },

      logout: () => {
        set({
          isLoggedIn: false,
          currentUser: null,
          loading: false,
          error: null
        });
      },

      loadUsers: async () => {
        try {
          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
          const response = await fetch(`${API_URL}/api/users`);
          if (!response.ok) throw new Error('HTTP Error: ' + response.status);

          const rawData = await response.json();
          const users = z.array(userSchema).parse(rawData.users || rawData);

          set({ users });
        } catch (err) {
          set({ error: 'Ошибка загрузки пользователей' });
        }
      },

      isAdmin: () => get().currentUser?.role === 'admin',
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        currentUser: state.currentUser
      })
    }
  )
);