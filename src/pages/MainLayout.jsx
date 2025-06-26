import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './Profile';
import TimeLine from './TimeLine';
import Search from './Search';

function MainLayout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TimeLine />} />
        <Route path="/Timeline" element={<TimeLine />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainLayout;