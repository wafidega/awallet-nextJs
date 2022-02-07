import Head from "next/head";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "styles/login.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store, persistor } from "stores";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            ></meta>
          </Head>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
