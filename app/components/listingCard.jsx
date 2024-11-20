// components/ListingCard.jsx
import Link from 'next/link';
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { db } from '@/firebase/firebaseConfig';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';


const ListingCard = ({ id, title, price, location, imageUrl, bedrooms, beds, rating, isFavorite, isFavoritesPage  }) => {
    const { user } = useAuth();

    const handleToggleFavorite = async () => {
        if (!user) {
            alert('Please sign in to manage favorites');
            return;
        }

        try {
            const userDocRef = doc(db, 'users', user.uid);
            if (isFavorite) {
                await updateDoc(userDocRef, {
                    favorites: arrayRemove(id),
                });
                alert('Removed from favorites');
            } else {
                await updateDoc(userDocRef, {
                    favorites: arrayUnion(id),
                });
                alert('Added to favorites');
            }
        } catch (error) {
            console.error('Error updating favorites:', error);
        }
    };

    return (

        <div className="border border-gray-300 rounded-lg overflow-hidden w-64 shadow-md relative">
            <Link href={`/listings/${id}`} passHref>
                <img src={imageUrl} alt={title} className="w-full h-36 object-cover" />
                <div className="p-4">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{title}</h3>
                    <span><i className="fa-solid fa-star text-sm"></i> {rating}</span>
                  </div>
                    <p className="text-gray-600">{bedrooms} Sovrum {beds} Sängar</p>
                    <p className="text-gray-800 font-semibold mt-4">{price} Kr/natt</p>
                </div>
            </Link>
            <button onClick={handleToggleFavorite} className="absolute top-2 right-2 mt-2 p-2 rounded">
                <i className={`${isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"} ${isFavoritesPage ? "text-red-500" : ""}`}></i>
            </button>
        </div>
    );
};


export default ListingCard;

