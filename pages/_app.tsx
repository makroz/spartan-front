import "../styles/globals.css";
import AxiosInstanceProvider from "../src/contexts/AxiosInstanceProvider";
import axiosInterceptors from "../src/interceptors/axiosInterceptors";
import AuthProvider from "../src/contexts/AuthProvider";
import LayoutHorizontal from "../src/components/layouts/LayoutHorizontal";
import LangProvider from "../src/contexts/LangProvider";

function MyApp({ Component, pageProps }: any) {
  return (
    <AxiosInstanceProvider interceptors={axiosInterceptors}>
      <AuthProvider auth={Component.auth}>
        <LangProvider>
          <LayoutHorizontal>
            <Component {...pageProps} />
          </LayoutHorizontal>
        </LangProvider>
      </AuthProvider>
    </AxiosInstanceProvider>
  );
}

export default MyApp;
