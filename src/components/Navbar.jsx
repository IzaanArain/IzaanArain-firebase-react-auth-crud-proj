import React from 'react';
import { Link } from 'react-router'; // ✅ Use 'react-router-dom'
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = UserAuth();

    const handleSignOut = async () => {
        try {
            await logout();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex justify-between items-center bg-gray-200 w-full p-4'>
            <h1 className='text-2xl font-bold'>
                Firebase Google Auth & Context
            </h1>

            <div className="flex items-center gap-4">
                {user?.displayName && (
                    <>
                        <Link to='/chat' className='text-blue-600 hover:underline'>
                            Chat
                        </Link>
                        <Link to='/todo' className='text-blue-600 hover:underline'>
                            Todo
                        </Link>
                    </>
                )}
                {user?.displayName ? (
                    <button onClick={handleSignOut} className='text-red-600'>
                        Logout
                    </button>
                ) : (
                    <Link to='/signin' className='text-blue-600'>
                        Sign in
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
