import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

//Components
import Carrousel from './Carrousel';
import Card from '../Card/Card';

//Images
import images from '../Utils/imges/cards/imageLoader'
import imagesCarrousel from '../Utils/imges/carrousel/carrouselLoader'


const Home = ({onScroll}) => {

  const navigate = useNavigate();

  return (
    <div>
      
      {/* Carrusel */}
      <div className=' border-b-2	'>
        <div className='h-[40rem]'>
          <Carrousel image={imagesCarrousel}/>
        </div>
        <div className='bg-black/[.4] z-40 h-[10rem] w-full mt-[15rem] absolute inset-0 flex flex-col items-center justify-center  text-white'>
          <h1 className='text-center text-white text-7xl font-bold mb-2'>Eco Plantas</h1>
          <h2 className='text-center text-white text-3xl'>Alquiler y Venta de plantas para eventos.</h2>
        </div>
      </div>

      {/* Card */}
      <div className="w-full mt-5 text-center">
        <div className='p-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center'>
          <div className="col-span-1">
            <h1 className=" mb-8  text-3xl xl:text-5xl	font-bold	">Transforma Tu Evento con Nuestro Servicio</h1>
            <h3 className='mb-3'>
              En Eco Plantas, nos especializamos en proporcionar una experiencia única a través del alquiler de flores y plantas para todo tipo de eventos. Desde bodas elegantes hasta celebraciones corporativas, nuestras decoraciones verdes añadirán un toque fresco y vibrante a tu ocasión especial.<br/><br/>
              Nuestro compromiso con la calidad y la atención al detalle asegura que cada planta y arreglo floral esté cuidadosamente seleccionado para realzar la estética de tu evento. Permítenos transformar tu espacio en un entorno mágico y lleno de vida.
            </h3>
          </div>
          <div className="col-span-1  flex justify-center">
            <Card image={images.team}/>
          </div>
        </div>
      </div>

      <div className="border-b-2 w-[95%] mx-auto m-5	"></div>



      {/* Services */}
      <div id="servicios" className= "m-[3rem]  flex flex-col items-center">
      <h1 className=' text-4xl mb-8 font-bold text-center'>Nuestro Servicio Incluye</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 items-start justify-center">
          <div className="col-span-1 flex flex-col items-center mb-3">
            <Card image={images.macetas} />
            <h1 className="m-5 text-2xl font-semibold">Alquiler</h1>
            <h3 className="w-[85%] text-center text-pretty">
              Ofrecemos una amplia variedad de macetas y plantas, ideales para decorar cualquier espacio. 
              Desde macetas pequeñas para interiores hasta grandes jardineras para exteriores.
            </h3>
          </div>
          <div className="col-span-1 flex flex-col items-center mb-6">
            <Card image={images.plantas} />
            <h1 className="m-5 text-2xl font-semibold">Venta</h1>
            <h3 className="w-[85%] text-center text-pretty">
            Explora nuestra amplia colección de plantas y macetas en distintos tamaños y estilos. Tenemos opciones ideales para embellecer tu hogar, oficina o darle un toque especial a cualquier evento.
            </h3>
          </div>
          <div className="col-span-1 flex flex-col items-center">
            <Card image={images.mantenimiento} />
            <h1 className="m-5 text-2xl font-semibold">Asesoramiento</h1>
            <h3 className="w-[85%] text-center text-pretty">
            Ofrecemos servicios completos de asesoramiento. Nuestro equipo te guiará en la selección de las plantas adecuadas para tu espacio, asegurando que siempre luzcan perfectas.
            </h3>
          </div>  
        </div>

        <button type="button" 
        className="flex justify-center items-center h-full w-fit text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-2xl px-5 py-2.5 m-5 mt-20"
        onClick={() => {
            navigate('/catalogo');
            onScroll('inicio');
              }}>
            Haga su Pedido
        </button>


      </div>

    </div>
  )
}

export default Home
