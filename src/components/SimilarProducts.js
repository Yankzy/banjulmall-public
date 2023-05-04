import Image from 'next/image'
import { products } from "../data"
import { TfiStar } from 'react-icons/tfi'
import { useDispatch } from 'react-redux'
import { addItem } from '../redux/cartSlice'

const SimilarProducts = () => {
    const dispatch = useDispatch();
  return (
    <div className='relative bg-white rounded-md mt-2 p-2'>
        <h2 className='font-bold'>Products related to items in your cart</h2>
        {products.slice(0, 4).map(({id, title, price, description, category, image, rating}) => (
        <>
            <div key={id} className='flex flex-row my-5 w-full justify-between'>
                <div className='flex items-center'>
                    <Image
                    src={image}
                    alt={title}
                    width={50}
                    height={50}
                    className='w-auto'
                    />
                    <div className='ml-2'>
                    <h1 className='text-sm text-[#3c8f9f] line-clamp-1'>{title}</h1>
                    <p className='text-xs text-green-600 my-1'>In Stock</p>
                    <div className='flex p-1'>
                        {Array(rating?.rate).fill().map((_, i) => (
                            <TfiStar key={i} className='h-5 text-yellow-500' />
                        ))}
                    </div>
                    <p className='text-sm px-2 top-0 text-[#3c8f9f]'>${price}</p>
                    
                    <button 
                        className='h-auto w-auto bg-gray-300 p-1 rounded-lg text-sm'
                        onClick={() => dispatch(addItem({title, description, category, image, price, id, quantity: 1}))}
                    >
                        Add to cart
                    </button>
                    <span className='mx-2 text-gray-200'>|</span>
                    <button className="text-[#3c8f9f] text-sm hover:underline">Save for later</button>
                    
                    </div>
                </div>
            </div>
            <hr />
        </>
        ))}
    </div>
  )
}

export default SimilarProducts