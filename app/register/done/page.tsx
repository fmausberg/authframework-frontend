'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const RegisterDonePageContent = () => {
  const searchParams = useSearchParams();
  const firstName = searchParams.get('firstName');
  const email = searchParams.get('email');

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow-md w-80 text-center">
        <h2 className="text-2xl font-bold mb-4">Thank you for registering, {firstName}!</h2>
        <p>We have sent you an email to {email}. Please confirm your email to complete the registration process.</p>
      </div>
    </div>
  );
};

export default function RegisterDonePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterDonePageContent />
    </Suspense>
  );
}
