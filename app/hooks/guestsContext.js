// app/hooks/GuestsContext.js
"use client";

import React, { createContext, useState, useContext } from 'react';

const GuestsContext = createContext();

export const GuestsProvider = ({ children }) => {
    const [numberOfGuests, setNumberOfGuests] = useState(1);

    return (
        <GuestsContext.Provider value={{ numberOfGuests, setNumberOfGuests }}>
            {children}
        </GuestsContext.Provider>
    );
};

export const useGuests = () => useContext(GuestsContext);