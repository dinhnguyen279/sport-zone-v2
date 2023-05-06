import React, { createContext, useEffect, useState } from 'react';
import { HOST } from '../domain/host/host';
import CartAPI from '../API/CartAPI';
import FavoriteAPI from '../API/Favorites';
import mainLayoutFacade from '../utils/mainLayoutFacade';

const CountContext = createContext();
const CountProvider = ({ children }) => {
  const { idUser } = mainLayoutFacade.useFacade();
  const [countCart, setCountCart] = useState(0);
  const [countWishlist, setCountWishlist] = useState(0);
  const [reloadCount, setReloadCount] = useState(true);

  useEffect(() => {
    const fecthCount = async () => {
      const getCount = (getCount) => {
        let count = getCount;
        let totalCount = 0;
        count.map((val) => {
          return (totalCount += val.quantity);
        });
        setCountCart(totalCount);
      };

      try {
        const cartResponse = await CartAPI.getCartById(`/${idUser}`);
        getCount(cartResponse.data);
      } catch (error) {
        console.log('error get api cart', error);
      }

      try {
        const favoritesResponse = await FavoriteAPI.getFavoriteById(`/${idUser}`);
        setCountWishlist(favoritesResponse.data);
      } catch (error) {
        console.log('error get api favorites', error);
      }
    };
    fecthCount();
    setReloadCount(true);
  }, [reloadCount]);
  // hàm này xử lý thêm sản phẩm vào yêu thích

  const value = {
    countCart,
    countWishlist,
    setReloadCount,
  };
  return <CountContext.Provider value={value}>{children}</CountContext.Provider>;
};

export { CountContext, CountProvider };
