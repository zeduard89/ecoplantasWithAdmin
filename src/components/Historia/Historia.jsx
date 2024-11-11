import React from 'react';
import Card from '../Card/Card';
import image from '../Utils/imges/historia/historiaLoader';

const Historia = () => {
  const cardData = [
    { title: "Hotel Faena", image: image.faena1 },
    { title: "Hotel Hilton", image: image.hilton1 },
    { title: "Iveco", image: image.iveco1 },
    { title: "Rural Buenos Aires", image: image.rural1 },
    { title: "Rural Corrientes", image: image.expoRuralCorrientes1 },
    { title: "Floripa Hilton", image: image.floripaHilton1 },
    { title: "BFM Marriot", image: image.bfmMarriot1 },
  ];

  return (
    <div className="lg:w-[90%] w-[90%] mx-auto lg:mx-auto">
      <div className="mt-[8rem] mx-[1rem] grid grid-cols-1 lg:grid-cols-2 text-center">
        <div className="w-full lg:w-[70%]">
          <Card image={image.team} shadowOn={true} />
        </div>
        <div className="content-center">
          <h1 className="mb-4 text-5xl font-semibold">¿Quiénes Somos?</h1>
          <h4 className="font-bold">
            Eco Plantas es una empresa dedicada al alquiler de flores y plantas para eventos y espacios corporativos. Nuestro objetivo es transformar cualquier entorno en un oasis de verde, aportando frescura y elegancia a cada ocasión.<br/><br/>
            A lo largo de los años, hemos trabajado con una amplia variedad de clientes, desde bodas y eventos corporativos hasta decoraciones para oficinas. Nuestra pasión por las plantas y el diseño floral nos ha llevado a crear espacios únicos y memorables para cada uno de nuestros clientes.
          </h4>
        </div>
      </div>

      <h1 className="w-[70%] sm:w-[60%] lg:w-[40%] p-1 mx-auto mt-28 border-t-2 border-x-2 rounded-t-full text-2xl md:text-3xl lg:text-3xl font-semibold text-center">
        Conoce Nuestra Trayectoria
      </h1>

      {/* Grid para pantallas grandes */}
      <div className="hidden md:grid grid-cols-2 border-t-2">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`col-span-1 p-10 flex flex-col border-b-2 ${
              index % 2 === 0 ? 'border-r-4' : ''
            } relative`}
          >
            <h1 className="text-3xl text-center p-5">{card.title}</h1>
            <Card image={card.image} shadowOn={true} />
          </div>
        ))}
      </div>

      {/* Grid para pantallas pequeñas */}
      <div className="block md:hidden border-t-2">
        {cardData.map((card, index) => (
          <div key={index} className="col-span-1 mt-10 flex flex-col text-center">
            <h1 className="text-3xl p-5">{card.title}</h1>
            <Card image={card.image} shadowOn={true} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Historia;
