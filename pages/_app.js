import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import { MoralisProvider } from "react-moralis";
import Script from "next/script";
import "./components/GlobalVariable"

function MyApp({ Component, pageProps }) {
  return (
    
    <Provider store={store}>
      <MoralisProvider
        appId={process.env.NEXT_PUBLIC_APP_ID}
        serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
      >
        <Script src= {global.apiurl + "Data/js/core/popper.min.js"}/>
        <Script src={global.apiurl + "Data/js/core/bootstrap.min.js"}/>
        <Script src={global.apiurl + "Data/argon-dashboard.min.js"}/>
        <Component {...pageProps} />
      </MoralisProvider>
    </Provider>

  );
}

export default MyApp;
