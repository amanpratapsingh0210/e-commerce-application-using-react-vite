import React, { Suspense } from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Suspense fallback={<div>Loading component...</div>}>
           <Outlet />
        </Suspense>
      </main>
    </>
  );
}

export default App;