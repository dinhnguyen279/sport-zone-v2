import { useLoaderData } from '@remix-run/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CartAPI from '../API/CartAPI';
import FavoriteAPI from '../API/Favorites';
import { HOST } from '../domain/host/host';
import { createFacade } from './facade';
const mainLayoutFacade = createFacade(() => {
  const loaderData = useLoaderData();
  const [countCart, setCountCart] = useState(0);
  const [countWishlist, setCountWishlist] = useState(0);
  const [reloadCount, setReloadCount] = useState(true);
  const idUser = loaderData.user_id ?? loaderData.id_user_clientage;
  useEffect(() => {
    const fecthCount = async () => {
      const getCount = (getCount) => {
        let count = getCount;
        let totalCount = 0;
        if (getCount.length === 0) {
          setCountCart(0)
          return
        }
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
  }, [reloadCount, idUser]);
  // hàm này xử lý thêm sản phẩm vào yêu thích

  const URL_CreateFavorites = `${HOST}/favorite/send`;

  const addWishlist = async (idProduct, sizeProduct) => {
    if (!sizeProduct) {
      toast('Bạn phải chọn size!', { type: 'warning' });
      return;
    }

    const data = {
      idUser,
      idProduct: idProduct,
      size: sizeProduct,
    };
    await axios.post(URL_CreateFavorites, data).then((res) => {
      if (res.data !== '') {
        setReloadCount(false);
        return;
      } else {
        toast('Sản phẩm đã có trong danh sách', { type: 'warning' });
        return;
      }
    });
  };

  return {
    idUser,
    countCart,
    countWishlist,
    setReloadCount,
    addWishlist,
  };
});

export default mainLayoutFacade;
