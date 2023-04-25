import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";


export default function Home({ products }) {

  return (
    <>
      <div className="bg-gray-100">
        <Head>
          <title>Home | Banjul Mall</title>
        </Head>
        
        <div className="flex flex-col">
          <Header />

          <main className='mx-auto pt-24 md:pt-28 lg:pt-32 xl:pt-36'>
            <Banner />
            <ProductFeed products={products} />
          </main>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch('https://fakestoreapi.com/products')
  .then((res) => res.json())
  
  return {
    props: {products}, // will be passed to the page component as props
  }
}
