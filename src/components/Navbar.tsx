import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Mail, User, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Mail className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold">Email Validator</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/customers" className="text-gray-700 hover:text-blue-600">
              Customers
            </Link>
            {user ? (
              <>
                <Link to="/credits" className="text-gray-700 hover:text-blue-600">
                  Credits
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-blue-600">
                  <User className="h-5 w-5" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-blue-600"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}