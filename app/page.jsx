// // FILE: app/page.jsx

// "use client"

// import { useEffect, useState } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '@/firebase/firebaseConfig';
// import { useAuth } from './hooks/authContext';
// import Navbar from './components/navbar';
// import ListingCard from './components/listingCard';

// export default function Home() {
//   const { user, loading } = useAuth();
//   const [listings, setListings] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     const fetchListings = async () => {
//       try {
//         const listingsCollection = collection(db, 'listings');
//         const listingsSnapshot = await getDocs(listingsCollection);
//         const listingsData = listingsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setListings(listingsData);
//       } catch (error) {
//         console.error('Error fetching listings:', error);
//       }
//     };

//     fetchListings();
//   }, []);

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//   };

//   const filteredListings = listings.filter(listing =>
//     listing.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const featuredListings = filteredListings.filter(listing => listing.featured);
//   const otherListings = filteredListings.filter(listing => !listing.featured);

//   if (loading) return <p>Loading...</p>;
//   return (
//     <>
//       <Navbar onSearch={handleSearch} />
//       <div className="flex flex-col items-center mt-24">
//         <h1 className="text-5xl mb-10">Erbjudanden</h1>
//         <div className="grid grid-cols-3 gap-12 justify-center mt-5">
//           {featuredListings.map(listing => (
//             <ListingCard
//               key={listing.id}
//               id={listing.id}
//               title={listing.title}
//               price={listing.price}
//               location={listing.location}
//               imageUrl={listing.images && listing.images[0]} // Show the first image
//               bedrooms={listing.bedrooms}
//               beds={listing.beds}
//               rating={listing.rating}
//             />
//           ))}
//         </div>
//       </div>
//       <div className="flex flex-col items-center justify-center min-h-screen mt-24">
//         <h2 className="text-5xl mb-10">Populära destinationer</h2>
//         <div className="grid grid-cols-3 gap-12 justify-center mt-5">
//           {otherListings.map(listing => (
//             <ListingCard
//               key={listing.id}
//               id={listing.id}
//               title={listing.title}
//               price={listing.price}
//               location={listing.location}
//               imageUrl={listing.images && listing.images[0]} // Show the first image
//               bedrooms={listing.bedrooms}
//               beds={listing.beds}
//               rating={listing.rating}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

"use client"

import { useAuth } from "./hooks/authContext";
import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import ListingCard from "./components/listingCard";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from "./components/navbar";

export default function Home() {

  const { user, loading } = useAuth();

  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsCollection = collection(db, 'listings');
        const listingsSnapshot = await getDocs(listingsCollection);
        const listingsData = listingsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListings(listingsData);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  const featuredListings = listings.filter(listing => listing.featured);
  const otherListings = listings.filter(listing => !listing.featured);

  if (loading) return <p>Loading...</p>;
  return (
    <>  

    <Navbar />
      <div className="flex flex-col items-center mt-24">
        <h1 className="text-5xl mb-10">Erbjudanden</h1>
        <div className="grid grid-cols-3 gap-12 justify-center mt-5">

        {featuredListings.map(listing => (
          <ListingCard
          key={listing.id}
          id={listing.id}
          title={listing.title}
          price={listing.price}
          location={listing.location}
          imageUrl={listing.images && listing.images[0]} // Show the first image
          bedrooms={listing.bedrooms}
          beds={listing.beds}
          rating={listing.rating}
          />
        ))}
        </div>

      </div>

    <div className="flex flex-col items-center justify-center min-h-screen mt-24">
        <h2 className="text-5xl mb-10">Populära destinationer</h2>
      <div className="grid grid-cols-3 gap-12 justify-center mt-5">
        {otherListings.map((listing) => (
          <ListingCard
          key={listing.id}
          id={listing.id}
          title={listing.title}
          price={listing.price}
          location={listing.location}
          imageUrl={listing.images && listing.images[0]} // Show the first image
          bedrooms={listing.bedrooms}
          beds={listing.beds}
          rating={listing.rating}
          />
        ))}
      </div>
    </div>
    </>
  );
}




