import Image from 'next/image';
import { StarIcon } from '@heroicons/react/outline';

const Product = ({ id, title, prrice, description, category, image }) => {
    const MAX_RATING = 5;
    const MIN_RATING = 1;
    const rating = Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING;
    const prime = Math.random() < 0.5;

    return (
        <div className='card'>
            <p className='category-text'>{category}</p>
            <div className='flex justify-center w-full'>
                <Image
                    src={image}
                    alt="product-image"
                    width={200}
                    height={200}
                    objectFit='contain'
                    className='cursor-pointer'
                />
            </div>
            <h4 className='my-3 min-h-[6rem]'>{title}</h4>
            <div className='flex'>
                {Array(rating).fill().map((_, i) => (
                    <StarIcon key={i} className='h-5 text-yellow-500' />
                ))}
            </div>
            <p className='text-xs my-2 line-clamp-2'>{description}</p>
            <p className='mb-5'>$45</p>
            {prime && (
                <div className='flex items-center space-x-2 -mt-5'>
                    <img className='w-12' src='/prime.png' alt="" />
                    <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                </div>
            )}
            <button className='button'>Add to cart</button>
        </div>
    )
}

export default Product