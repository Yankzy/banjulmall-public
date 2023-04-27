import Head from "next/head";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import DesktopHeader from '../components/DesktopHeader';
import MobileHeader from '../components/MobileHeader';
import { useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";


export default function Home({ products }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const parser = new UAParser();
    const userAgent = window.navigator.userAgent;
    const result = parser.setUA(userAgent).getResult();
    const isMobileDevice = /mobile/i.test(result.device.type);
    setIsMobile(isMobileDevice);
  }, []);

  return (
    <>
      <div className="bg-gray-100">
        <Head>
          <title>Home | Banjul Mall</title>
        </Head>
        <main>
          {isMobile ? <MobileHeader /> : <DesktopHeader />}
          <Banner />
          <ProductFeed products={products} />
        </main>
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
