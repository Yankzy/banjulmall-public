import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { addItem } from '../redux/cartSlice';
import { products } from '../data';
import { useEffect } from 'react';
import { localSaveItems, removeSavedItem } from '../redux/saveItemsSlice';
import { TfiStar } from 'react-icons/tfi';


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
    <div className='bg-white rounded-md'>
      <h1 className='p-5 text-2xl'>Saved Items</h1><hr/>
      <div className='save_items_grid'>
        {items.length > 0 ? (items?.map(item => (
          <div key={item.id} className='card flex flex-col'>
              <div className='flex-grow overflow-y-auto min-h-[400px]'>
                  <p className='category-text'>{item.category}</p>
                  <div className='flex justify-center w-full'>
                      <Image
                          src={item.image}
                          alt="product-image"
                          width={70}
                          height={70}
                          className='cursor-pointer w-auto'
                      />
                  </div>
                  <h4 className='my-3 line-clamp-2'>{item.title}</h4>
                  <div className='flex'>
                      {Array(item?.rating?.rate).fill().map((_, i) => (
                          <TfiStar key={i} className='h-5 text-yellow-500' />
                      ))}
                  </div>
                  <p className='text-xs my-2 line-clamp-2'>{item.description}</p>
                  <p className='mb-5'>${item.price}</p>
              </div>
              <button 
                  className='h-auto w-auto bg-gray-300 p-1 rounded-lg text-sm'
                  onClick={() => handleMoveToCart(item)}
              >
                  Move to cart
              </button>
          </div>
        )))
        : (
          <div className='flex flex-col items-center justify-center p-0'>
            <p className='text-2xl p-5'>No saved items</p>
          </div>
        )}
      </div>
    </div>
)
}


export default SaveItems;
