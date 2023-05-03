import { products } from "../data"
import Product from "./Product"

const ProductFeed = () => {
  return (
    <div className='feed-grid'>
      {products.slice(0, 4).map(({id, title, price, description, category, image, rating}) => (
        <Product
          key={id}
          id={id}
          title={title}
          price={price}
          description={description}
          category={category}
          image={image} 
          rating={rating}
        />
      ))}

    {/* middle banner */}
    <img 
      className='md:col-span-full'
      src="/4.jpg" 
      alt="middle banner" 
    />

    <div className="">
      {products.slice(4, 5).map(({id, title, price, description, category, image, rating}) => (
        <Product
          key={id}
          id={id}
          title={title}
          price={price}
          description={description}
          category={category}
          image={image} 
          rating={rating}
        />
        
      ))}
    </div>
      {products.slice(5, products.length).map(({id, title, price, description, category, image, rating}) => (
        <Product
          key={id}
          id={id}
          title={title}
          price={price}
          description={description}
          category={category}
          image={image} 
          rating={rating}
        />
      ))}
    </div>

  )
}


export default ProductFeed