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
            <div className="flex flex-col relative top-20 w-3/5">
                <div className="flex justify-between items-center">

                    <h1 className="text-4xl mb-2">{listing.title}</h1>
                    <p className=""><i className="fa-solid fa-star text-sm"></i> {listing.rating}</p>
                </div>

                <div className="">
                    <img src={listing.images[0]} className="h-72 w-full object-cover" />
                </div>

                <div>
                    <p className="font-bold">Din värd: {listing.host}</p>
                    <div className="flex gap-2">

                        <p>{listing.bedrooms} Bedrooms</p>
                        <span className="text-2xl">&middot;</span>
                        <p> {listing.beds} Beds</p>
                    </div>
                </div>

                <div className="flex mt-24 justify-between">
                    <p className="w-4/6">{listing.description}</p>
                    <BookCard
                     listingId={id}
                     className="" />
                </div>

            </div>
        </div>
        </>
    );
};

export default ListingDetails;