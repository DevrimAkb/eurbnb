"use client"

import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { db } from '@/firebase/firebaseConfig';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import ListingCard from '../components/listingCard';


const Favorites = () => {
    const { user, loading } = useAuth();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!user) return;

            try {
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    const favoriteIds = userData.favorites || [];

                    if (favoriteIds.length > 0) {
                        const listingsCollection = collection(db, 'listings');
                        const q = query(listingsCollection, where('__name__', 'in', favoriteIds));
                        const listingsSnapshot = await getDocs(q);
                        const listingsData = listingsSnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        setFavorites(listingsData);
                    }
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, [user]);

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>Please sign in to view your favorites.</p>;

    return (
        <div>
            <h1>Favoriter</h1>
            <div style={gridStyles}>
                {favorites.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        id={listing.id}
                        title={listing.title}
                        price={listing.price}
                        location={listing.location}
                        imageUrl={listing.images && listing.images[0]} // Show the first image
                        isFavorite={true} // Indicate that these listings are favorites
                        isFavoritesPage={true} // Indicate that this is the favorites page
                    />
                ))}
            </div>
        </div>
    );
};

const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '16px',
    padding: '20px',
};

export default Favorites;

