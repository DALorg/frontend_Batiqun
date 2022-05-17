import "../styles/globals.css";
import Script from "next/script";
// import Layout from "./components/Layout";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    // <Layout>
    <Provider store={store}>
      <MoralisProvider
        appId={process.env.NEXT_PUBLIC_APP_ID}
        serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
      >
        <Script src="https://batiqunapi.azurewebsites.net/Data/js/core/popper.min.js"/>
        <Script src="https://batiqunapi.azurewebsites.net/Data/js/core/bootstrap.min.js"/>
        <Script src="https://batiqunapi.azurewebsites.net/Data/argon-dashboard.min.js"/>
        <Component {...pageProps} />
      </MoralisProvider>
    </Provider>

    // </Layout>
  );
}

export default MyApp;
