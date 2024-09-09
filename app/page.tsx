"use client";

import React, { useState } from 'react';
import FormComponent from './components/login/FormComponent';

const Home = () => {
    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <FormComponent/>
        </div>
    );
};

export default Home;