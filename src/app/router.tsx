import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LandingPage from "../pages/LandingPage"
import LoginPage from "../pages/LoginPage"
import ChattingPage from "../pages/ChattingPage"
import { ChatProvider } from "@/entities/message/contexts/ChatContext"
// import OverviewPage from "./pages/OverViewPage"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/chat" element={<Navigate to="/chat/new" replace />} />
                <Route path="/chat/new" element={
                    <ChatProvider>
                        <ChattingPage />
                    </ChatProvider>} />
                <Route path="/chat/:id" element={
                    <ChatProvider>
                        <ChattingPage />
                    </ChatProvider>} />
                {/* <Route path="/overview" element={<OverviewPage />} /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default Router;

