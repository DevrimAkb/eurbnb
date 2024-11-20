// FILE: app/components/navbar.jsx

"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../hooks/authContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';

const Navbar = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            router.push('/'); // Redirect to home page after sign out
        } catch (err) {
            console.log("Error signing out: ", err);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.push(`/search?query=${searchQuery}`);
    };

    return (
        <div className="flex justify-between items-center p-4">
            <Link href="/" className="text-logo text-3xl p-2 pl-6">eurBnb</Link>

            <div className="flex items-center space-x-4">
                <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Search destination"
                        className="p-2 rounded-md text-black"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button type="submit" className="hidden">Search</button>
                </form>
                <input
                    type="date"
                    placeholder="Check-in"
                    className="p-2 rounded-md text-black"
                />
                <input
                    type="date"
                    placeholder="Check-out"
                    className="p-2 rounded-md text-black"
                />
            </div>

            <div className="relative">
                <button onClick={toggleMenu} className="p-2">
                    <i className="fa fa-bars"></i>
                </button>
                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                        <Link href="/" className="block px-4 py-2">Home</Link>
                        {user && <Link href="/favorites" className="block px-4 py-2">Favorites</Link>}
                        <Link href="/userBookings" className="block px-4 py-2">My bookings</Link>
                        {user ? (
                            <button onClick={handleSignOut} className="block w-full text-left px-4 py-2">Sign out</button>
                        ) : (
                            <button onClick={() => router.push('/signin')} className="block w-full text-left px-4 py-2">Sign in</button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;


// // FILE: app/components/navbar.jsx

// "use client"

// import React, { useState } from 'react';
// import { useAuth } from '../hooks/useAuth';
// import { signOut } from 'firebase/auth';
// import { auth } from '@/firebase/firebaseConfig';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// const Navbar = ({ onSearch }) => {
//     const { user } = useAuth();
//     const router = useRouter();
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [searchQuery, setSearchQuery] = useState('');

//     const handleSignOut = async () => {
//         try {
//             await signOut(auth);
//             router.push('/'); // Redirect to home page after sign out
//         } catch (err) {
//             console.log("Error signing out: ", err);
//         }
//     };

//     const toggleMenu = () => {
//         setMenuOpen(!menuOpen);
//     };

//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//         onSearch(e.target.value);
//     };

//     return (
//         <div className="flex justify-between items-center p-4">
//             <Link href="/" className="text-logo text-3xl p-2 pl-6">eurBnb</Link>

//             <div className="flex items-center space-x-4">
//                 <input
//                     type="text"
//                     placeholder="Search destination"
//                     className="p-2 rounded-md text-black"
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                 />
//                 <input
//                     type="date"
//                     placeholder="Check-in"
//                     className="p-2 rounded-md text-black"
//                 />
//                 <input
//                     type="date"
//                     placeholder="Check-out"
//                     className="p-2 rounded-md text-black"
//                 />
//             </div>

//             <div className="relative">
//                 <button onClick={toggleMenu} className="p-2">
//                     <i className="fa fa-bars"></i>
//                 </button>
//                 {menuOpen && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
//                         <Link href="/" className="block px-4 py-2">Home</Link>
//                         {user && <Link href="/favorites" className="block px-4 py-2">Favorites</Link>}
//                         <Link href="/userBookings" className="block px-4 py-2">My bookings</Link>
//                         {user ? (
//                             <button onClick={handleSignOut} className="block w-full text-left px-4 py-2">Sign out</button>
//                         ) : (
//                             <button onClick={() => router.push('/signin')} className="block w-full text-left px-4 py-2">Sign in</button>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Navbar;

// "use client"

// import React, { useState } from 'react';
// import { useAuth } from '../hooks/useAuth';
// import { signOut } from 'firebase/auth';
// import { auth } from '@/firebase/firebaseConfig';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// const Navbar = () => {
//     const { user } = useAuth();
//     const router = useRouter();
//     const [menuOpen, setMenuOpen] = useState(false);

//     const handleSignOut = async () => {
//         try {
//             await signOut(auth);
//             router.push('/'); // Redirect to home page after sign out
//         } catch (err) {
//             console.log("Error signing out: ", err);
//         }
//     };

//     const toggleMenu = () => {
//         setMenuOpen(!menuOpen);
//     };

//     return (
//         <div className="flex justify-between items-center p-4">
//             <Link href="/" className="text-logo text-3xl p-2 pl-6">eurBnb</Link>

//             <div className="flex items-center space-x-4">
//                 <input
//                     type="text"
//                     placeholder="Search destination"
//                     className="p-2 rounded-md text-black"
//                 />
//                 <input
//                     type="date"
//                     placeholder="Check-in"
//                     className="p-2 rounded-md text-black"
//                 />
//                 <input
//                     type="date"
//                     placeholder="Check-out"
//                     className="p-2 rounded-md text-black"
//                 />
//             </div>

//             <div className="relative">
//                 <button onClick={toggleMenu} className="p-2">
//                     <i className="fa fa-bars"></i>
//                 </button>
//                 {menuOpen && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
//                         <Link href="/" className="block px-4 py-2">Home</Link>
//                         {user && <Link href="/favorites" className="block px-4 py-2">Favorites</Link>}
//                         <Link href="/userBookings" className="block px-4 py-2">My bookings</Link>
//                         {user ? (
//                             <button onClick={handleSignOut} className="block w-full text-left px-4 py-2">Sign out</button>
//                         ) : (
//                             <button onClick={() => router.push('/signin')} className="block w-full text-left px-4 py-2">Sign in</button>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Navbar;
