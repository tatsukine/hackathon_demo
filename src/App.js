import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SpotifyCallback from './pages/SpotifyCallback ';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 一旦完成したもの */}
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />

        {/* 未完成のもの */}
        {/* <AwsCognitoDemo/> */}
        {/* <Test2/> */}
        <Route path="/spotify-callback" element={<SpotifyCallback />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;