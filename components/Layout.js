import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <div className="">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}