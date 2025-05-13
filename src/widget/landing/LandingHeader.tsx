import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import useAuthStore from "@/entities/auth/store/useAuthStore";

const LandingHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const { isLoggedIn, logout } = useAuthStore();
    const handleNavigation = (path: string) => {
        if (currentPath === path) return;
        navigate(path);
    };

    const handleLogout = () => {
        logout();
        handleNavigation('/');
    };

    return (
        <header className="border-b bg-white">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => handleNavigation('/')}
                >
                    <span className="text-xl font-bold">AI Interview</span>
                </div>
                <div className="flex items-center space-x-4">
                    {isLoggedIn ? (
                        <Button
                            onClick={handleLogout}
                            variant="ghost"
                            className="text-sm font-medium text-black border border-black/50 cursor-pointer hover:bg-gray-100 hover:text-black"
                        >
                            로그아웃
                        </Button>
                    ) : (
                        <Button
                            onClick={() => handleNavigation('/login')}
                            variant="ghost"
                            className="text-sm font-medium text-black border border-black/50 cursor-pointer hover:bg-gray-100 hover:text-black"
                        >
                            로그인
                        </Button>
                    )}

                    <Button
                        onClick={() => handleNavigation(isLoggedIn ? '/chat' : '/login')}
                        className="bg-emerald-600 cursor-pointer hover:bg-emerald-700 "
                    >
                        시작하기
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default LandingHeader;