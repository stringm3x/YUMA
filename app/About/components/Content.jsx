import Image from "next/image";
import React from "react";

const Content = () => {
  return (
    <section className="w-full flex flex-col">
      <div className="flex flex-row  sm:p-10">
        <div className="w-1/3 sm:w-1/4 flex flex-col text-center font-black font-passion leading-[200px] xl:leading-[300px] text-9xl xl:text-[250px]  ">
          <h1>Y</h1>
          <h1>U</h1>
          <h1>M</h1>
          <h1>A</h1>
        </div>

        <div className="w-2/3 p-3 sm:w-3/4 flex flex-col justify-center">
          <div>
            <h1 className="text-5xl font-semibold">Historia</h1>
            <p className="text-md sm:text-2xl">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-[100vh] relative flex flex-col justify-center items-center">
        <Image
          src="/women/promotionw.png"
          fill
          alt="Yuma"
          className="object-cover absolute"
        />
        <Image src="/Yuma.png" width={200} height={100} alt="Yuma" className="relative"/>
      </div>
    </section>
  );
};

export default Content;
