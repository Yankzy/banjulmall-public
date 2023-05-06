import Head from "next/head";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import Header from '../components/Header';


export default function Home() {

  return (
      <div className="bg-gray-100">
        <Head>
          <title>Home | Banjul Mall</title>
        </Head>
        <main>
          <Header />
          <Banner />  
          <ProductFeed />
        </main>
      </div>
  );
}

// export async function getServerSideProps(context) {
//   // timeout for 10 seconds
//   const timeout = 10 * 1000;
//   const timeoutPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({
//         props: {products: 1}, // will be passed to the page component as props
//       })
//     }, timeout)
//   })
  
//   return {
//     props: {products: 1}, // will be passed to the page component as props
//   }
// }
