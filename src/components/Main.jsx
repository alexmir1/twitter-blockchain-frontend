import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MetaMaskProvider } from "metamask-react";

import Auth from './Auth';
import Feed from './Feed';

const Main = () => {
  return (
    <Routes>
        <Route exact path='/' element={<MetaMaskProvider><Auth /></MetaMaskProvider>}></Route>
        <Route exact path='/feed' element={<Feed />}></Route>
    </Routes>
  );
}

export default Main;
