"use client"

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/firebaseConfig';
import Navbar from '@/app/components/navbar';
import Link from 'next/link';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user data in Firestore, using UID as document ID
            await setDoc(doc(db, 'users', user.uid), {
                firstName: firstName,
                lastName: lastName,
                id: user.uid,
                email: email
            });

            console.log('User created and data saved in Firestore');
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
      <>
      <Navbar />
      <div className="w-3/6 m-auto flex flex-col justify-center items-center mt-20">
        <h1 className="text-lg">Registrera konto</h1>
        <form className="text-black flex flex-col gap-4 p-4" onSubmit={handleSignup}>
            <input
                className="p-2 w-72"
                type="text"
                placeholder="Förnamn"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            <input
                className="p-2 w-72"
                type="text"
                placeholder="Efternamn"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
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
                placeholder="Lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button className="bg-btn p-2 rounded text-white text-lg" type="submit">Registrera</button>
        </form>
        <div>
          <p>Har du redan ett konto? Logga in <Link href="/signin" className="text-blue-900 underline">här</Link></p>
        </div>
      </div>

        </>
    );
};

export default Signup;



