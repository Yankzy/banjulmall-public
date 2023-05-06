import { Provider } from 'react-redux'
import store from '../redux/store'
import '../styles/globals.css'
import { FirebaseProvider } from '../../firebase/Config'
import NextNProgress from 'nextjs-progressbar';


const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <FirebaseProvider>
      <NextNProgress color="#5dff00" startPosition={0.3} height={3} showOnShallow={true} />
        <Component {...pageProps} />
      </FirebaseProvider>
    </Provider>
  )
}

export default MyApp
