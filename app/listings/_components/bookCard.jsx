// app/listings/_components/bookCard.jsx
import React, { useState, useEffect } from 'react';
import { format, differenceInDays } from 'date-fns';
import { useDate } from '@/app/hooks/DateContext';
import { useGuests } from '@/app/hooks/GuestsContext';
import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const BookCard = ({ listingId }) => {
    const { startDate, setStartDate, endDate, setEndDate } = useDate();
    const { numberOfGuests, setNumberOfGuests } = useGuests();
    const [listing, setListing] = useState(null);
    const router = useRouter();
    const numberOfDays = differenceInDays(endDate, startDate);
    const totalPrice = listing ? numberOfDays * listing.price : 0;

    useEffect(() => {
        const fetchListing = async () => {
            const listingDoc = await getDoc(doc(db, 'listings', listingId));
            if (listingDoc.exists()) {
                setListing(listingDoc.data());
            } else {
                console.error('Listing not found');
            }
        };

        fetchListing();
    }, [listingId]);

    const handleBooking = () => {
        const queryParams = new URLSearchParams({
            listingId,
            startDate: format(startDate, 'yyyy-MM-dd'),
            endDate: format(endDate, 'yyyy-MM-dd'),
            numberOfGuests,
        });
        router.push(`/bookingDetails?${queryParams.toString()}`);
    };

    return (
        <div className="book-card p-4 w-80 border rounded shadow-lg bg-white">
            <div className="flex">
                <label className="flex-1 border border-slate-400 rounded-md overflow-hidden">
                    Incheckning:
                    <input
                        className="border p-2 rounded w-full"
                        placeholder="check-in"
                        type="date"
                        value={format(startDate, 'yyyy-MM-dd')}
                        onChange={(e) => setStartDate(new Date(e.target.value))}
                    />
                </label>
                <label className="flex-1 border border-slate-400 rounded-md overflow-hidden">
                    Utcheckning:
                    <input
                        className="border p-2 rounded w-full"
                        placeholder="check-out"
                        type="date"
                        value={format(endDate, 'yyyy-MM-dd')}
                        onChange={(e) => setEndDate(new Date(e.target.value))}
                    />
                </label>
            </div>
            <label className="block mb-4 border border-slate-400 rounded-md">
                Antal:
                <select
                    className="border p-2 rounded w-full"
                    placeholder="Antal"
                    value={numberOfGuests}
                    onChange={(e) => setNumberOfGuests(parseInt(e.target.value))}
                >
                    {[...Array(10).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
            </label>
            <div className="flex flex-col justify-center items-center">

            <p>{numberOfDays > 0 ? `${numberOfDays} Dygn` : 'Please select valid dates'}</p>
            <p>{listing ? `${listing.price} kr Per natt` : 'Loading price...'}</p>
            <input
                    type="text"
                    className="w-full p-2 border border-slate-400 rounded-md"
                    placeholder="Rabbattkod"
                />
            <p className="font-bold">{totalPrice > 0 ? `Totalt: ${totalPrice} kr` : 'Loading price...'}</p>
            <p>Inklusive skatter och avgifter</p>
                <button
                    className="bg-btn text-white p-2 rounded w-4/5 mt-4"
                    onClick={handleBooking}
                >
                    Reservera
                </button>
            </div>
        </div>
    );
};

export default BookCard;
