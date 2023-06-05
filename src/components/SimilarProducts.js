import Image from 'next/image'
import { products } from "../data"
import { TfiStar } from 'react-icons/tfi'
import { useDispatch } from 'react-redux'
import { addItem } from '../redux/cartSlice'
import { addSavedItem } from '../redux/saveItemsSlice'

const SimilarProducts = () => {
    const dispatch = useDispatch();
  return (
    <div className='relative bg-white rounded-md mt-2 p-2'>
        <h2 className='font-bold'>Products related to items in your cart</h2>
        {products.slice(0, 4).map((item) => (
        <>
            <div key={item.id} className='flex flex-row my-5 w-full justify-between'>
                <div className='flex items-center'>
                    <Image
                    src={item.image}
                    alt={item.title}
                    width={50}
                    height={50}
                    className='w-auto'
                    />
                    <div className='ml-2'>
                    <h1 className='text-sm text-[#3c8f9f] line-clamp-1'>{item.title}</h1>
                    <p className='text-xs text-green-600 my-1'>In Stock</p>
                    <div className='flex p-1'>
                        {Array(item?.rating?.rate).fill().map((_, i) => (
                            <TfiStar key={item.id} className='h-5 text-yellow-500' />
                        ))}
                    </div>
                    <p className='text-sm px-2 top-0 text-[#3c8f9f]'>${item.price}</p>
                    
                    <button 
                        className='h-auto w-auto bg-gray-200 py-1 px-2 rounded-md text-sm shadow-md border-gray-300'
                        onClick={() => dispatch(addItem({...item, quantity: 1}))}
                    >
                        Add to cart
                    </button>
                    <span className='mx-2 text-gray-200'>|</span>
                    <button 
                        className="text-[#3c8f9f] text-sm hover:underline"
                        onClick={() => dispatch(addSavedItem({item, quantity: 1}))}
                    >
                        Save for later</button>
                    
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