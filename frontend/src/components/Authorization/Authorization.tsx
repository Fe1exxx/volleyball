// Zustand
import { useAuthStore } from '../../GlobalSetZustand/authStore';

// Components
import UserMenu from '../UserAndAdmin/UserMenu';
import AdminMenu from '../UserAndAdmin/AdminMenu'; 
import Entrance from './Entrance';

export default function Authorization() {
  const { isLoggedIn, currentUser } = useAuthStore();

  // Open Admin menu
  if (isLoggedIn && currentUser?.role === 'admin') return <AdminMenu />
  
  //Open User menu
  if (isLoggedIn && currentUser?.role === 'user') return <UserMenu />
  
  //Autorization menu
  return <Entrance />
}