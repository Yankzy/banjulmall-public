import Head from "next/head";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import Header from '../components/Header';
import { useDispatch } from "react-redux";
import { toggleOverlay } from "../redux/modalSlice";



export default function Home({products}) {

  const dispatch = useDispatch();

  return (
      <div className="bg-gray-100">
        <Head>
          <title>Home | Banjul Mall</title>
        </Head>
        <main>
          <Header />
          <Banner />  
          <ProductFeed products={products} />
        </main>
      </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch('https://fakestoreapi.com/products')
  .then((res) => res.json())
  .catch((err) => console.log(err));
  
  return {
    props: {products}, // will be passed to the page component as props
  }
}
