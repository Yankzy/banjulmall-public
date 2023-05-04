import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { addItem } from '../redux/cartSlice';
import { products } from '../data';
import { useEffect } from 'react';
import { localSaveItems, removeSavedItem } from '../redux/saveItemsSlice';


function SaveItems() {
  const router = useRouter();
  const { slug } = router.query;

  const items = useSelector(({savedItems}) => savedItems.items);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(localSaveItems());
  }, []);


  const handleMoveToCart = (item) => {
    dispatch(addItem(item));
    dispatch(removeSavedItem(item.id));
  };

  return (
    <>
      <div className='relative h-full bg-white p-10 rounded-md mb-72'>
        <h1 className='text-2xl'>Saved Items</h1>
        {items.length ? (
          <div className='flex flex-col p-5'>
            {products.slice(0, 4)?.map((item, i) => (
            <>
              <div key={i} className='flex flex-row my-3 w-full justify-between'>
                <div className='flex items-center'>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={70}
                    height={70}
                    className='w-auto'
                  />
                  <div className='ml-2 min-h-[90%]'>
                    <h1 className='text-lg font-medium'>{item.title}</h1>
                    <p className='text-xs text-green-600 my-3'>In Stock</p>
                    <span className='mx-2 text-gray-200'>|</span>
                    <button 
                      className="text-[#3c8f9f] text-sm hover:underline"
                      onClick={() => handleMoveToCart(item)}
                    >
                      Move to cart
                    </button>
                    
                  </div>
                </div>
                <div className="flex items-start">
                  <p className='text-xl font-extrabold top-0'>{item.price}</p>
                </div>
              </div>
              <hr />
            </>
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center h-full'>
            <p className='text-xl'>Nothing to see here</p>
          </div>
        )}

      </div>
    </>
  );
}


export default SaveItems;
