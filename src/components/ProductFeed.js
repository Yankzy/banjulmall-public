import Product from "./Product"

const ProductFeed = ({ products }) => {
  return (
    <div className='feed-grid'>
      {products.slice(0, 4).map(({id, title, prrice, description, category, image}) => (
          <Product
          key={id}
          id={id}
          title={title}
          prrice={prrice}
          description={description}
          category={category}
          image={image} 
        />
      ))}

    {/* middle banner */}
    <img 
      className='md:col-span-full'
      src="/4.jpg" 
      alt="middle banner" 
    />

    <div className="md:col-span-2">
      {products.slice(4, 5).map(({id, title, prrice, description, category, image}) => (
        <Product
          key={id}
          id={id}
          title={title}
          prrice={prrice}
          description={description}
          category={category}
          image={image} 
        />
        
      ))}
    </div>
      {products.slice(5, products.length).map(({id, title, prrice, description, category, image}) => (
        <Product
          key={id}
          id={id}
          title={title}
          prrice={prrice}
          description={description}
          category={category}
          image={image} 
        />
      ))}
    </div>

  )
}

export default ProductFeed