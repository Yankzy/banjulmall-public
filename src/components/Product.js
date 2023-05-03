import Image from 'next/image';
import { TfiStar } from 'react-icons/tfi';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';

const Product = (props) => {
    const {id, title, price, description, category, image, rating} = props
    const {rate, count} = rating;
    const prime = Math.random() < 0.5;
    const dispatch = useDispatch();

    return (
        <div className='card flex flex-col'>
            <div className='flex-grow overflow-y-auto min-h-[400px]'>
                <p className='category-text'>{category}</p>
                <div className='flex justify-center w-full'>
                    <Image
                        src={image}
                        alt="product-image"
                        width={100}
                        height={100}
                        className='cursor-pointer w-auto'
                    />
                </div>
                <h4 className='my-3'>{title}</h4>
                <div className='flex'>
                    {Array(rate).fill().map((_, i) => (
                        <TfiStar key={i} className='h-5 text-yellow-500' />
                    ))}
                </div>
                <p className='text-xs my-2 line-clamp-2'>{description}</p>
                <p className='mb-5'>${price}</p>
                {prime && (
                    <div className='flex items-center space-x-2 -mt-5'>
                        <img className='w-12' src='/prime.png' alt="" />
                        <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                    </div>
                )}
            </div>
            <button 
                className='button'
                onClick={() => dispatch(addItem({title, description, category, image, price, id, quantity: 1}))}
            >
                Add to cart
            </button>
        </div>
    )
}

export default Product;
