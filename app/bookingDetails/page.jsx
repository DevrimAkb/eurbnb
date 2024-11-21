"use client"

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useAuth } from '@/app/hooks/authContext';
import { differenceInDays } from 'date-fns';
import Navbar from '../components/navbar';

const BookingDetails = () => {
    const { user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const listingId = searchParams.get('listingId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const numberOfGuests = searchParams.get('numberOfGuests');
    const [listing, setListing] = useState(null);
    const [address, setAddress] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [area, setArea] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const cleaningFee = 500
    const serviceFee = 762


    useEffect(() => {
        if (bookingSuccess) {
            router.push('/bookingConfirmation');
        }
    }, [bookingSuccess, router]);

    useEffect(() => {
        const fetchListing = async () => {
            if (!listingId) return;
            const docRef = doc(db, 'listings', listingId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setListing(docSnap.data());
            } else {
                console.log('No such listing!');
            }
        };

        fetchListing();
    }, [listingId]);

    const handleBooking = async (e) => {
        e.preventDefault();
        const booking = {
            listingId,
            startDate,
            endDate,
            numberOfGuests,
            firstName,
            lastName,
            address,
            postalCode,
            area,
            phoneNumber,
            email
        };

        try {
            const userDocRef = doc(db, 'users', user.uid);
            await updateDoc(userDocRef, {
                bookings: arrayUnion(booking),
            });

            const listingDocRef = doc(db, 'listings', listingId);
            await updateDoc(listingDocRef, {
                bookedUsers: arrayUnion({
                    userId: user.uid,
                    email: email,
                    numberOfGuests,
                    firstName,
                    lastName,
                    address,
                    postalCode,
                    area,
                    phoneNumber,
                }),
            });

            alert('Booking successful');
            setBookingSuccess(true);
        } catch (error) {
            console.error('Error booking listing:', error);
        }
    };

    return (
      <>
      <Navbar />

      <div className="booking-details w-full">
    <h1 className="text-3xl text-center mt-12 mb-20">Skicka bokingsförfrågan</h1>

    {listing && (
        <div className="listing-card border border-slate-400 rounded-md p-4 mb-4 w-full sm:w-4/5 md:w-2/5 m-auto flex flex-col sm:flex-row">
            <img src={listing.images[0]} alt={listing.title} className="w-full sm:w-1/3 h-auto object-cover mr-0 sm:mr-4 mb-4 sm:mb-0" />
            <div className="flex-1 text-sm">
                <h3 className="font-bold">{listing.title}</h3>
                <p>Sovrum: {listing.bedrooms} Sängar: {listing.beds}</p>
                <p className="font-bold">Datum</p>
                <div className="flex justify-between">
                    <p>{startDate} - {endDate}</p>
                    <p>{numberOfGuests} Gäster</p>
                </div>
                <div className="flex justify-between mt-2">
                    <p>Städavgift:</p>
                    <p>{cleaningFee} kr</p>
                </div>
                <div className="flex justify-between">
                    <p>eurbnb service avgift:</p>
                    <p>{serviceFee} kr</p>
                </div>
                <div className="flex justify-between mt-2">
                    <p>Antal dagar:</p>
                    <p>{differenceInDays(new Date(endDate), new Date(startDate))} dagar</p>
                </div>
                <div className="flex justify-between mt-2 font-bold">
                    <p>Totalt :</p>
                    <p>{listing.price} kr</p>
                </div>
            </div>
        </div>
    )}
    <form action="" className="flex flex-col justify-center items-center w-full sm:w-4/5 md:w-2/5 mx-auto p-4" onSubmit={handleBooking}>
        <h2 className="mt-4 text-3xl text-center mb-5">Dina uppgifter</h2>
        <div className="flex flex-col sm:flex-row w-full space-y-4 sm:space-y-0 sm:space-x-4">
            <label className="flex-1">
                <input
                    className="border p-2 border-slate-700 rounded w-full"
                    placeholder='Förnamn'
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </label>
            <label className="flex-1">
                <input
                    className="border p-2 border-slate-700 rounded w-full"
                    placeholder='Efternamn'
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </label>
        </div>

        <label className="w-full mt-4">
            <input
                className="border p-2 border-slate-700 rounded w-full"
                placeholder='Address'
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
        </label>

        <div className="flex flex-col sm:flex-row w-full space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
            <label className="flex-1">
                <input
                    className="border p-2 border-slate-700 rounded w-full"
                    placeholder='Postnummer'
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                />
            </label>
            <label className="flex-1">
                <input
                    className="border p-2 border-slate-700 rounded w-full"
                    placeholder='Ort'
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                />
            </label>
        </div>

        <label className="w-full mt-4">
            <input
                className="border p-2 border-slate-700 rounded w-full"
                placeholder='Email'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </label>

        <label className="w-full mt-4">
            <input
                className="border p-2 border-slate-700 rounded w-full"
                placeholder='Telefonnummer'
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
        </label>

        <h2 className="mt-4 text-3xl text-center">Betalning</h2>
        <label className="w-full">
          <input 
            className="border p-2 border-slate-700 rounded w-full mt-12"
            placeholder='Kortnummer'
            type="text" />
        </label>

        <div className="flex gap-2 w-full">
        <label className="w-full mt-4">
          <input 
            className="border p-2 border-slate-700 rounded w-full"
            placeholder='Datum'
            type="text" />
        </label>

        <label className="w-full mt-4">
          <input 
            className="border p-2 border-slate-700 rounded w-full"
            placeholder='CVV'
            type="text" />
        </label>
        </div>

        

        <button type="submit" className="bg-btn text-white w-full sm:w-2/4 p-4 mt-4 rounded-md">Reservera och betala</button>
    </form>
</div>
        </>
    );
};

export default BookingDetails;



