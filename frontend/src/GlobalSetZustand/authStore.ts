import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { z } from 'zod';

const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email()
});

const usersResponseSchema = z.object({
  users: z.array(userSchema)
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
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      currentUser: null,
      users: [],
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch('http://localhost:3001/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });

          const data = await response.json();

          if (!response.ok) {
            set({ error: data.error || 'Ошибка входа' });
            return;
          }

          set({
            isLoggedIn: true,
            currentUser: data.user, 
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
          const response = await fetch('http://localhost:3001/api/users');
          if (!response.ok) throw new Error('HTTP Error: ' + response.status);

          const rawData = await response.json();
          const validatedData = usersResponseSchema.parse(rawData);

          set({ users: validatedData.users });
        } catch (err) {
          set({ error: 'Ошибка загрузки пользователей' });
        }
      }
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