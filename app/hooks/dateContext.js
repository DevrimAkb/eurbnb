// app/hooks/DateContext.js
"use client";

import React, { createContext, useState, useContext } from 'react';

const DateContext = createContext();

export const DateProvider = ({ children }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <DateContext.Provider value={{ startDate, setStartDate, endDate, setEndDate, }}>
            {children}
        </DateContext.Provider>
    );
};

export const useDate = () => useContext(DateContext);