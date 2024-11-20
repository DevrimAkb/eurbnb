"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

const BookingConfirmation = () => {
    const router = useRouter()

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src="/success.png" alt="Booking Successful" className="w-1/2 h-auto" />
      <div className="flex gap-4">
        <button onClick={() => router.push('/')} className="bg-btn p-4 rounded-md text-white">Tillbaka till startsidan</button>
        <button onClick={() => router.push('/userBookings')} className="bg-btn p-4 rounded-md text-white">Mina bokningar</button>
      </div>
    </div>
  )
}

export default BookingConfirmation