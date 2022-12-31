import "../styles/globals.css";
import type { AppProps } from "next/app";
import AxiosInstanceProvider from "../src/contexts/AxiosInstanceProvider";
import axiosInterceptors from "../src/interceptors/axiosInterceptors";
import useAuth from "../src/hooks/useAuth";
import { useRouter } from "next/router";
import Login from "./login";
import Spinner from "../src/components/layouts/Spinner";

function MyApp({ Component, pageProps }: any) {
  return (
    <AxiosInstanceProvider interceptors={axiosInterceptors}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </AxiosInstanceProvider>
  );
}

export default MyApp;

function Auth({ children }) {
  const { user, loaded } = useAuth();

  if (!loaded) {
    return <Spinner />;
  }

  if (!user) {
    return <Login />;
  }

  return children;
}
