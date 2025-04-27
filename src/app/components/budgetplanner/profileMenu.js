'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCircle2, LogOut, Trophy } from 'lucide-react';
import { GiWallet } from 'react-icons/gi';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/firebase/Firebase';

const ProfileMenu = ({ userInfo, setActiveSection }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const res = await fetch(`/api/user?uid=${user.uid}`);
          const data = await res.json();
          if (res.ok) {
            setDisplayName(data.displayName);
          } else {
            console.error('Error fetching user:', data.error);
          }
        } catch (err) {
          console.error('Fetch failed:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 bg-white px-3 py-1 rounded-xl shadow hover:bg-gray-100 transition"
      >
        <UserCircle2 size={24} className="text-purple-700" />
        <div>
          <p>Hi {displayName || userInfo?.userName || 'User'}</p>
        </div>
      </button>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className="absolute mt-2 left-0 bg-white border rounded-lg shadow-lg w-48 z-50"
          >
            <button
              onClick={() => {
                router.push('/profile');
                setShowMenu(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <UserCircle2 size={16} /> Profile
            </button>
            <button
              onClick={() => {
                router.push('/profile');
                setShowMenu(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Trophy size={16} /> Achievement History
            </button>
            <button
              onClick={() => {
                router.push('/profile');
                setShowMenu(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <GiWallet size={16} /> Budgeting History
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileMenu;
