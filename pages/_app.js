import "../styles/globals.css";
import Layout from "../components/layout";
import { Toast, Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Toaster />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
