"use client"

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/navbar';
import Link from 'next/link';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (userCredential) {
                router.push('/'); 
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
      <>
      <Navbar />
      <div className="w-3/6 m-auto flex flex-col justify-center items-center mt-20">
        <h1 className="text-lg">Logga in</h1>
        <form className="text-black flex flex-col p-4 gap-4" onSubmit={handleLogin}>
            <input
                className="p-2 w-72"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            <input
                className="p-2 w-72"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            <button className="bg-btn p-2 rounded text-white text-lg" type="submit">Logga in</button>
        </form>
        <p>Inget konto än? Registrera dig <Link href="/signup" className="text-blue-900 underline">här</Link></p>
      </div>
        </>
    );
};


export default Login;
