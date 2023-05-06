import { Outlet, useLoaderData } from '@remix-run/react';
import { createFacade } from '../utils/facade';
import { useEffect, useState } from 'react';
import CartAPI from '../API/CartAPI';
import FavoriteAPI from '../API/Favorites';
import Header from '../Share/Header/Header';
import ScrollToTopButton from '../Share/ScrollTop/ScrollTopButton';
import Footer from '../Share/Footer/Footer';
import mainLayoutFacade from '../utils/mainLayoutFacade';

export { loader } from '../layout/Main';

export default () => {
  return (
    <mainLayoutFacade.Provider>
      <div className="root-layout">
        <Header />
        <ScrollToTopButton />

        <main>
          <Outlet />
        </main>

        <Footer />
      </div>
    </mainLayoutFacade.Provider>
  );
};
