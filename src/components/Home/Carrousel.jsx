import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './carrousel.css';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const Carrousel = ({image}) => {
   


  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  // Check if image is an array or an object
  const imageValues = Array.isArray(image) ? image : Object.values(image);



  return (
    <>
      <Swiper
        spaceBetween={5}
        centeredSlides={true}
        speed={2000}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: false,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
      {imageValues.map((imgSrc, index) => (
        <SwiperSlide key={index}>
          <img src={imgSrc} alt={`Imagen ${index + 1}`}/>
        </SwiperSlide>
      ))}
        
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
    );
};

export default Carrousel;
