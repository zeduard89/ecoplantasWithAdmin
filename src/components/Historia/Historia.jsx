import React from 'react';
import Card from '../Card/Card';
import image from '../Utils/imges/historia/historiaLoader'
const shadowOn = true;

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
    <div  className="lg:w-[90%] w-[90%] mx-auto lg:mx-auto">
      <div className="mt-[8rem] mx-[1rem] space-x-1 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2  justify-items-center  text-center">
        <div className="w-[100%]  col-span-1 place-content-center ">
          <Card image={image.team} shadowOn={shadowOn} />
        </div>
        <div className='content-center col-span-1'>
          <h1 className='mb-[1rem] text-5xl font-semibold '>¿Quiénes Somos?</h1>
          <h4 className='font-bold'>
            Eco Plantas es una empresa dedicada al alquiler de flores y plantas para eventos y espacios corporativos. Nuestro objetivo es transformar cualquier entorno en un oasis de verde, aportando frescura y elegancia a cada ocasión.<br/><br/>
            A lo largo de los años, hemos trabajado con una amplia variedad de clientes, desde bodas y eventos corporativos hasta decoraciones para oficinas. Nuestra pasión por las plantas y el diseño floral nos ha llevado a crear espacios únicos y memorables para cada uno de nuestros clientes.
          </h4>
        </div>
      </div>

      <h1 className="w-[70%] sm:w-[60%] lg:w-[40%] p-1 mx-auto mt-28 border-t-2 border-x-2 rounded-t-full text-2xl md:text-3xl lg:text-3xl font-semibold text-center">
        Conoce Nuestra Trayectoria
      </h1>


      <div className='hidden md:block'>
        <div className="grid grid-cols-2 text-center border-t-2 ">  
          
          <div className="col-span-1 border-r-4 p-10 flex flex-col border-b-2  relative">
            <h1 className='content-center p-5 mb-9 w-[30%] sm:w-[36%] xl:w-[40%] absolute right-0	' ></h1>
            <h1 className='content-center text-3xl p-5'>{cardData[0].title}</h1>
            <div>
            <Card image={image.faena1} shadowOn={shadowOn}/>
            </div>
          </div>

          <div className="col-span-1 p-10  flex flex-col border-b-2 relative">
            <h1 className='content-center p-5  mb-9  absolute w-[35%] sm:w-[40%]	' ></h1>
            <h1 className='content-center text-3xl p-5'>{cardData[1].title}</h1>
            <div>
              <Card image={image.hilton1} shadowOn={shadowOn} />
            </div>
          </div>

          <div className="col-span-1 border-r-4 p-10 flex flex-col border-b-2 relative">
            <h1 className='content-center p-5  mb-9 w-[30%] sm:w-[36%] xl:w-[40%] absolute right-0	' ></h1>
            <h1 className='content-center text-3xl p-5'>{cardData[2].title}</h1>
            <div>
              <Card image={image.iveco1} shadowOn={shadowOn} />
            </div>
          </div>

          <div className="col-span-1 p-10 flex flex-col border-b-2 relative">
            <h1 className='content-center p-5  mb-9  absolute w-[35%] sm:w-[40%]	' ></h1>
            <h1 className='content-center text-3xl p-5'>{cardData[3].title}</h1>
            <div>
              <Card image={image.rural1} shadowOn={shadowOn} />
            </div>
          </div>

          <div className="col-span-1 border-r-4 p-10 flex flex-col border-b-2 relative">
            <h1 className='content-center p-5  mb-9 w-[30%] sm:w-[36%] xl:w-[40%] absolute right-0	' ></h1>
            <h1 className='content-center text-3xl p-5'>{cardData[4].title}</h1>
            <div>
              <Card image={image.expoRuralCorrientes1} shadowOn={shadowOn} />
            </div>
          </div>

          <div className="col-span-1 p-10 flex flex-col relative">
            <h1 className='content-center p-5  mb-9  absolute w-[35%] sm:w-[40%]	' ></h1>
            <h1 className='content-center text-3xl p-5'>{cardData[5].title}</h1>
            <div>
              <Card image={image.floripaHilton1} shadowOn={shadowOn} />
            </div>
          </div>

          <div className="col-span-1 border-r-4 p-10 flex flex-col relative">
            <h1 className='content-center p-5  mb-9 w-[30%] sm:w-[36%] xl:w-[40%] absolute right-0	' ></h1>
            <h1 className='content-center text-3xl p-5'>{cardData[4].title}</h1>
            <div>
              <Card image={image.bfmMarriot1} shadowOn={shadowOn} />
            </div>
          </div>

        </div>

      </div>

      {/* Grid para pantallas pequeñas */}
      <div className="block md:hidden border-t-2">
        {cardData.map((card, index) => (
          <div key={index} className="col-span-1 mt-10 flex flex-col text-center">
            <h1 className="content-center text-3xl p-5">{card.title}</h1>
            <Card image={card.image} shadowOn={shadowOn} />
          </div>
        ))}
      </div>
    


    </div>
  );
}

export default Historia;


