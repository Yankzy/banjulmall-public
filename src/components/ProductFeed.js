import { products } from "../data"
import Product from "./Product"



const ProductFeed = () => {
  return (
    <div className='feed-grid'>
      {products.slice(0, 4).map((item) => (
        <Product
          key={item.id}
          item={item}
        />
      ))}

    {/* middle banner */}
    <img 
      className='md:col-span-full'
      src="/4.jpg" 
      alt="middle banner" 
    />

    <div className="">
      {products.slice(4, 5).map((item) => (
        <Product
          key={item.id}
          item={item}
        />
        
      ))}
    </div>
      {products.slice(5, products.length).map((item) => (
        <Product
          key={item.id}
          item={item}
        />
      ))}
    </div>

  )
}


export default ProductFeed