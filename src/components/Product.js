import Image from 'next/image';
import { TfiStar } from 'react-icons/tfi';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import crypto from 'crypto';

const Product = ({ title, description, category, image }) => {
    const rating = Math.floor(Math.random() * 5) + 1;
    const prime = Math.random() < 0.5;
    const items = useSelector(({cart}) => cart.items);
    const dispatch = useDispatch();

    const uniqueStr = () => {
        return `${crypto.randomBytes(20).toString('hex')}`;
    }

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
                    {Array(rating).fill().map((_, i) => (
                        <TfiStar key={i} className='h-5 text-yellow-500' />
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
            </div>
            <button 
                className='button'
                onClick={() => dispatch(addItem({title, description, category, image, price: 45, id: uniqueStr()}))}
            >
                Add to cart
            </button>
        </div>
    )
}

export default Product;
