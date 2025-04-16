import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { UserAuth } from '../context/AuthContext';
import GoogleBtn from './GoogleBtn';
const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signIn, user } = UserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try {
            await signIn(email, password)
            navigate('/account')
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    };

    useEffect(() => {
        if (user != null) {
            navigate('/account');
        }
    }, [user]);

    return (
        <div className='bg-amber-600 max-w-[700px] mx-auto my-16 p-4'>
            <h1 className="text-2xl font-bold py-2">
                Sign in to your account
            </h1>
            <p className="py-2">
                Don't have a account yet? <Link to={"/signup"} className='underline'>Sign up</Link>.
            </p>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col py-2'>
                    <label htmlFor="email" className='py-2 font-medium'>Email Address</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} className='border p-3' name='email' id='email' />
                </div>
                <div className='flex flex-col py-2'>
                    <label htmlFor="password" className='py-2 font-medium'>Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} className='border py-3' name='password' id='password' />
                </div>
                <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
                    Sign In
                </button>
            </form>
            <GoogleBtn />
        </div>
    )
}

export default Signin