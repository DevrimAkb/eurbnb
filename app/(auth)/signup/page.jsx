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
    const [errors, setErrors] = useState({});

    const validateForm = () => {
      const newErrors = {};
      if (firstName.length < 2) newErrors.name = "Name must be at least 2 characters.";
      if (lastName.length < 2) newErrors.subject = "Lastname must be at least 2 characters.";
      if (email.length < 2) newErrors.message = "Email must be at least 2 characters.";
      if (password.length < 2) newErrors.message = "Password must be at least 2 characters.";
      return newErrors;
    };


    const handleSignup = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }


        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
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



