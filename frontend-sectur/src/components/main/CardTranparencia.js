import React from 'react'

export default function CardTranparencia({ img, title}) {
  return (
    <div className="flex flex-row h-40 xl:w-[500px] w-[380px] bg-[F9F9F9] rounded-full">
    <img className="w-40 rounded-full" src={require("../../assets/assetsMap/"+img+"")} alt="Avatar" />
    <div className="flex flex-col w-full justify-center">
      <p className="h-28 flex items-center text-center xl:text-base text-sm font-medium text-[#890E33] px-2">{title}</p>
      <button className="bg-[#bfc2c7] py-1 xl:mx-20 mx-4 rounded-sm hover:bg-[#890E33] hover:text-white">Mas información</button>
    </div>
  </div>
  )
}
