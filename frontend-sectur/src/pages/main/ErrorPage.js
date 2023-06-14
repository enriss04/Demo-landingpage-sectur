import React from 'react'

export default function ErrorPage() {
  return (
    <div className='flex xl:flex-row flex-col justify-center items-center w-full h-[90vh] gap-x-4'>
        <div className='text-6xl text-center font-medium font-sans'>404</div>
        <div className='text-6xl text-center font-bold font-sans'>Page not found</div>
    </div>
  )
}
