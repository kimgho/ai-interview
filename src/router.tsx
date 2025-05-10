import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import ChattingPage from "./pages/ChattingPage"
// import OverviewPage from "./pages/OverViewPage"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/chat" element={<ChattingPage />} />
                {/* <Route path="/overview" element={<OverviewPage />} /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default Router;

