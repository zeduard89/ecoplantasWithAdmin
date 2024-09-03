import React, { useState, useEffect, useCallback } from 'react';
import CardPlantas from '../Card/CardPlantas';
import CardMacetas from '../Card/CardMacetas';
import CardMaceteros from '../Card/CardMaceteros';
import { useSelector } from 'react-redux';
import medCuad from '../Utils/imges/macetas/medidasCuadradas.jpg';
import medRec from '../Utils/imges/macetas/medidasRectangulares.jpg';

//Update catalogo
import { useDispatch } from "react-redux";
import fetchCatalogo from '../api/fetchCatalogo';
import { addCatalogo, reset } from '../../redux/catalogoSlice';

const Catalogo = () => {
  //get catalogo from  wordpress y update redux
  const dispatch = useDispatch();
  const catalogo = useSelector((state) => state.catalogo);
  const [selectedImage, setSelectedImage] = useState(null);


//----------------------Carga de imagenes--------------------------------
  const fetchPosts = useCallback(async () => {
    try {
      const datosPosts = await fetchCatalogo();
      if (datosPosts.macetas.length !== catalogo.macetas.length || datosPosts.plantas.length !== catalogo.plantas.length){
        dispatch(reset());
        dispatch(addCatalogo(datosPosts));
      } 
    } catch (err) {
      console.log("Error", err);
    }
  }, [dispatch]);

  useEffect(() => {
      fetchPosts();
  }, [fetchPosts]);
  //----------------------------------------------------------

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleOverlayClick = () => {
    setSelectedImage(null);
  };

  return (
    <div className="my-[6rem] text-center">
      <h1 className="text-5xl font-bold text-center mb-16">CATALOGO</h1>
      
      
        <div className=" flex flex-col justify-center">
          {/* Plantas */}
          <div>
            <h1 className=" text-3xl md:text-4xl lg:text-4xl text-white font-bold">
              PLANTAS
            </h1>
            {catalogo.plantas.length === 0 && <div>No hay Plantas disponibles</div>}
            <div className="flex flex-row justify-center flex-wrap">
              {catalogo.plantas.map((planta, index) => (
                <div key={index}>
                  <CardPlantas {...planta} />
                </div>
              ))}
            </div>
          </div>

          {/* Macetas */}
          <div>
            <h1 className="mb-6 mt-6 text-3xl md:text-4xl lg:text-4xl text-white font-bold">
              MACETAS
            </h1>
            {catalogo.macetas.length === 0 && <div>No hay Macetas disponibles</div>}
            <div className="flex flex-row justify-center flex-wrap">
              {catalogo.macetas.map((maceta, index) => (
                <div key={index}>
                  <CardMacetas {...maceta} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-row justify-center flex-wrap">
            <img
              src={medRec}
              alt="Medidas Rectangulares"
              className="rounded-md m-8 ml-6 h-[25rem] w-[15rem] md:w-[18rem] lg:w-[18rem] cursor-pointer transition-transform duration-300 transform hover:scale-105"
              onClick={() => handleImageClick('medRec')}
            />
            <img
              src={medCuad}
              alt="Medidas Cuadradas"
              className="rounded-md m-8 ml-6 h-[25rem] w-[15rem] md:w-[18rem] lg:w-[18rem] cursor-pointer transition-transform duration-300 transform hover:scale-105"
              onClick={() => handleImageClick('medCuad')}
            />
          </div>

          <div>
            <h1 className="mb-6 mt-6  text-3xl md:text-4xl lg:text-4xl text-white font-bold">
              MACETEROS
            </h1>
            {catalogo.maceteros.length === 0? <div>No hay Maceteros disponibles</div>
            :(
            <div className="lg:grid lg:grid-cols-2"> 
              <CardMaceteros maceteros={catalogo.arrayMaceteros20} maceteroType={'20'} />
              <CardMaceteros maceteros={catalogo.arrayMaceteros30} maceteroType={'30'} />
            </div>
            )}
          </div>

        </div>

      {/* zoom Img */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70"
          onClick={handleOverlayClick}
        >
          <div className="relative flex flex-col items-center gap-8">
            <button
              className="absolute top-4 right-4 text-white text-3xl bg-black bg-opacity-70 rounded-full p-2"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
            <img
              src={selectedImage === 'medRec' ? medRec : medCuad}
              alt={selectedImage === 'medRec' ? "Medidas Rectangulares" : "Medidas Cuadradas"}
              className="rounded-md h-[80%] max-w-[90%] transition-transform duration-300 transform scale-105"
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default Catalogo;
