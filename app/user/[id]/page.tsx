'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../../api/auth/authContext';
import api from '../../api/auth/axiosInstance'; // Import axios instance

interface User {
  publicName: string;
  createdAt: string;
  id: number;
}

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    api
      .get(`/appuser/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => {
        setError('Error fetching user data: ' + (err.response?.data?.message || err.message));
      });

  }, [id]);

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Public Profile</h1>
      <p className="text-xl mb-2">Public Name: <span className="font-medium">{user.publicName}</span></p>
      <p className="text-xl mb-2">ID: <span className="font-medium">{user.id}</span></p>
      <p className="text-xl mb-2">Created At: <span className="font-medium">{new Date(user.createdAt).toLocaleDateString('en-GB')}</span></p>
    </div>
  );
};

export default UserProfile;
