import React from 'react';
import EmailValidator from '../components/EmailValidator';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <EmailValidator />
    </div>
  );
}