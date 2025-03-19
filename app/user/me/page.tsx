'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../../api/auth/authContext';
import api from '../../api/auth/axiosInstance'; // Import axios instance

interface User {
  publicName: string;
  firstName: string;
  lastName: string;
  mail: string;
  createdAt: string;
  id: number;
}

const UserProfile = () => {
  const router = useRouter();
  const { appUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (appUser === undefined) {
      // Wait for appUser to be determined
      return;
    }

    if (!appUser) {
      setLoading(false);
      return;
    }

    api
      .get(`/appuser/${appUser.id}`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching user data: ' + (err.response?.data?.message || err.message));
        setLoading(false);
      });

  }, [appUser]);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  if (!appUser) {
    return <div className="text-center text-xl">Please login</div>;
  }

  if (!user) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4">Your Profile</h1>
        <p className="text-xl mb-2">ID: <span className="font-medium">{user.id}</span></p>
        <p className="text-xl mb-2">Public Name: <span className="font-medium">{user.publicName}</span></p>
        <p className="text-xl mb-2">First Name: <span className="font-medium">{user.firstName}</span></p>
        <p className="text-xl mb-2">Last Name: <span className="font-medium">{user.lastName}</span></p>
        <p className="text-xl mb-2">EMail: <span className="font-medium">{user.mail}</span></p>
        <p className="text-xl mb-2">Created At: <span className="font-medium">{new Date(user.createdAt).toLocaleDateString('en-GB')}</span></p>
        <a href={`/user/${appUser.id}`}>
            <button className="bg-primaryButton hover:bg-primaryButton-hover text-primaryButton-text font-bold py-2 px-4 rounded">
                Go to Public Profile
            </button>
        </a>
    </div>
  );
};

export default UserProfile;
