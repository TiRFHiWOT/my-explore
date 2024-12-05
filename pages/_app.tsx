import { AppProps } from "next/app";
import "@/app/globals.css";
import { Poppins } from "next/font/google";
import { Provider } from "react-redux";
import store from "@/store/store";
import { UserProvider } from "@/components/Dashboard/userContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Provider store={store}>
        <main className={poppins.className}>
          <Component {...pageProps} />
        </main>
      </Provider>
    </UserProvider>
  );
}

export default MyApp;
