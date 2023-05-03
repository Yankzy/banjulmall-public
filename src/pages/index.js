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
  
//   return {
//     props: {products}, // will be passed to the page component as props
//   }
// }
