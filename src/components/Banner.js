import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const Banner = () => {
    const imgs = ["/1.jpg", "/2.jpg", "/3.jpg"]

  return (
    <div className='relative'>
        <div className='absolute w-full h-30 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20'/>
        <Carousel
            autoPlay
            infiniteLoop
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            interval={3000}
        >
            {imgs.map((img) => (
                <div>
                    <img loading='lazy' alt='' src={img} />
                </div>
            ))}
            
        </Carousel>
    </div>
);
}

export default Banner