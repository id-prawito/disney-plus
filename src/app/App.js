import { BrowserRouter, Route } from "react-router-dom";
import { GlobalProvider } from "../config/GlobalState";
import Scroll from "../components/Header/Scroll";
import Routes from "../config/RoutesDisney";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "swiper/swiper.min.css";
import "./App.scss";

function App() {
    return (
        <GlobalProvider>
            <BrowserRouter basename="/disney-plus">
                <Route
                    render={(props) => (
                        <>
                            <Header {...props} />
                            <Scroll />
                            <Routes />
                            <Footer />
                        </>
                    )}
                />
            </BrowserRouter>
        </GlobalProvider>
    );
}

export default App;
