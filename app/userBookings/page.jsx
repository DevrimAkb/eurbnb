"use client"

import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { db } from '@/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const UserBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [listings, setListings] = useState({});


    useEffect(() => {
        const fetchBookings = async () => {
            if (!user) return;

            try {
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const bookingsData = userData.bookings || [];
                    setBookings(bookingsData);
                } else {
                    console.error('No such document!');
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, [user]);

    useEffect(() => {
      const fetchListings = async () => {
          const listingsData = {};
          for (const booking of bookings) {
              if (booking.listingId) {
                  const listingDoc = await getDoc(doc(db, 'listings', booking.listingId));
                  if (listingDoc.exists()) {
                      listingsData[booking.listingId] = listingDoc.data();
                  }
              }
          }
          setListings(listingsData);
      };

      if (bookings.length > 0) {
          fetchListings();
      }
  }, [bookings]);

    if (!user) return <p>Please sign in to view your booking history.</p>;

    return (

      <div className="booking-history">
      <h2 className="text-4xl text-center mt-10">Bokningshistorik</h2>
      {bookings.length === 0 ? (
          <p>No bookings found.</p>
      ) : (
          <ul className="mt-20">
              {bookings.map((booking, index) => (
                  <li key={index} className="listing-card border border-slate-400 rounded-md p-4 mb-4 w-2/5 m-auto flex">
                      {listings[booking.listingId] && listings[booking.listingId].images && (
                          <>
                              <img
                                  src={listings[booking.listingId].images[0]}
                                  alt={`Listing ${booking.listingId}`}
                                  className="w-1/3 h-auto object-cover mr-4"
                              />
                              <div className="flex-1 text-sm">
                                  <h3 className="font-bold">{listings[booking.listingId].title}</h3>
                                  <p>Sovrum: {listings[booking.listingId].bedrooms} Sängar: {listings[booking.listingId].beds}</p>
                                  <p className="font-bold">Datum</p>
                                  <div className="flex justify-between">
                                      <p>{booking.startDate} - {booking.endDate}</p>
                                      <p>{booking.numberOfGuests} Gäster</p>
                                  </div>
                                  <div className="flex justify-between mt-2">
                                      <p>Städavgift:</p>
                                      <p>{listings[booking.listingId].cleaningFee} kr</p>
                                  </div>
                                  <div className="flex justify-between">
                                      <p>eurbnb service avgift:</p>
                                      <p>{listings[booking.listingId].serviceFee} kr</p>
                                  </div>
                                  <div className="flex justify-between mt-2">
                                      <p>Antal dagar:</p>
                                      <p>{listings[booking.listingId].numberOfDays} dagar</p>
                                  </div>
                                  <div className="flex justify-between mt-2 font-bold">
                                      <p>Totalt :</p>
                                      <p>{listings[booking.listingId].totalPrice} kr</p>
                                  </div>
                              </div>
                          </>
                      )}
                  </li>
              ))}
          </ul>
      )}
  </div>
    );
};

export default UserBookings;

