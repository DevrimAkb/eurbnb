"use client"


import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import { useParams, useRouter } from 'next/navigation';
import BookCard from '../_components/bookCard';
import Navbar from '@/app/components/navbar';

const ListingDetails = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);

    useEffect(() => {
        const fetchListing = async () => {
            if (!id) return;
            const docRef = doc(db, 'listings', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setListing(docSnap.data());
            } else {
                console.log('No such listing!');
            }
        };

        fetchListing();
    }, [id]);

    if (!id) return <p>Loading...</p>;
    if (!listing) return <p>Loading...</p>;

    return (
      <>
      <Navbar />

      <div className="flex justify-center">
    <div className="flex flex-col relative top-20 w-full sm:w-4/5 md:w-3/5 px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            <h1 className="text-4xl mb-2">{listing.title}</h1>
            <p className="mt-2 sm:mt-0"><i className="fa-solid fa-star text-sm"></i> {listing.rating}</p>
        </div>

        <div className="mt-4">
            <img src={listing.images[0]} className="h-72 w-full object-cover" />
        </div>

        <div className="mt-4 text-center sm:text-left">
            <p className="font-bold">Din värd: {listing.host}</p>
            <div className="flex justify-center sm:justify-start gap-2 mt-2">
                <p>{listing.bedrooms} Bedrooms</p>
                <span className="text-2xl">&middot;</span>
                <p>{listing.beds} Beds</p>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row mt-12 sm:mt-24 justify-between items-center sm:items-start text-center sm:text-left">
            <p className="w-full sm:w-4/6">{listing.description}</p>
            <BookCard listingId={id} className="mt-4 sm:mt-0" />
        </div>
    </div>
</div>
     
        </>
    );
};

export default ListingDetails;