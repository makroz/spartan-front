import "../styles/globals.css";
import AxiosInstanceProvider from "../src/contexts/AxiosInstanceProvider";
import axiosInterceptors from "../src/interceptors/axiosInterceptors";
import AuthProvider from "../src/contexts/AuthProvider";
import LayoutHorizontal from "../src/components/layouts/LayoutHorizontal";

function MyApp({ Component, pageProps }: any) {
  return (
    <AxiosInstanceProvider interceptors={axiosInterceptors}>
      <AuthProvider auth={Component.auth}>
        <LayoutHorizontal>
          <Component {...pageProps} />
        </LayoutHorizontal>
      </AuthProvider>
    </AxiosInstanceProvider>
  );
}

export default MyApp;
