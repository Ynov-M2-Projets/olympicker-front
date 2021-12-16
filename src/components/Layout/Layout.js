import Header from "./header/Header";
import Footer from "./footer/Footer";

export default function Layout({children}){
    return (
        <>
            <Header/>
            <div className="mb-2">
                {children}
            </div>
            <Footer/>
        </>
    );
}