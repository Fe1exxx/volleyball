// Zustand
import { useAuthStore } from '../../GlobalSetZustand/authStore';

// Components
import UserMenu from '../UserAndAdmin/UserMenu';
import AdminMenu from '../UserAndAdmin/AdminMenu';
import Entrance from './Entrance';

export default function Authorization() {
  const { isLoggedIn, isAdmin } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn,
    isAdmin: state.isAdmin()
  }));

  if (isLoggedIn && isAdmin) return <AdminMenu />;
  if (isLoggedIn) return <UserMenu />;
  return <Entrance />;
}