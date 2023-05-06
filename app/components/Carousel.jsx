import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from '../Share/img/Image';

import { Navigation, Pagination, Autoplay } from 'swiper';
import { Card } from 'react-bootstrap';
const Carousel = () => {
  return (
    <>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Card.Img src={Image.banner1} alt="banner2" />
        </SwiperSlide>
        <SwiperSlide>
          <Card.Img src={Image.banner2} alt="banner3" />
        </SwiperSlide>
        <SwiperSlide>
          <Card.Img src={Image.banner3} alt="banner3" />
        </SwiperSlide>
        <SwiperSlide>
          <Card.Img src={Image.banner4} alt="banner4" />
        </SwiperSlide>
        <SwiperSlide>
          <Card.Img src={Image.banner5} alt="banner5" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Carousel;
