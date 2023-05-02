import { Provider } from 'react-redux'
import store from '../redux/store'
import '../styles/globals.css'
import { FirebaseProvider } from '../../firebase/Config'


const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <FirebaseProvider>
        <Component {...pageProps} />
      </FirebaseProvider>
    </Provider>
  )
}

export default MyApp
