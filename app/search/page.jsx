"use client"


import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import ListingCard from '../components/listingCard';
import Navbar from '../components/navbar';

const SearchResults = () => {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('query')?.toLowerCase();
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
                const filteredListings = listingsData.filter(listing =>
                    listing.location.toLowerCase().includes(searchQuery)
                );
                setListings(filteredListings);
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
        };

        if (searchQuery) {
            fetchListings();
        }
    }, [searchQuery]);

    return (
      <>
      <Navbar />
        <div className="flex flex-col items-center mt-24">
            <h1 className="text-xl mb-10">
            {listings.length} Boenden i {searchQuery}
            </h1>
            <div className="grid grid-cols-3 gap-12 justify-center mt-5">
                {listings.map(listing => (
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
};

export default SearchResults;

