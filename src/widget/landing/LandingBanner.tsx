import { useNavigate } from "react-router-dom"
import { Button } from "@/shared/ui/button"
import useAuthStore from "@/entities/auth/store/useAuthStore";


const LandingBanner = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthStore();
    return (
        <section className="bg-emerald-600 py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            매일 매일 꾸준한 기술 면접 준비
                        </h2>
                        <p className="max-w-[900px] mx-auto text-emerald-50 md:text-xl">
                            AI와 기술 면접을 해보세요
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                        <Button size="lg" onClick={() => navigate(isLoggedIn ? '/chat' : '/login')} className="bg-white text-emerald-600 hover:bg-emerald-50">
                            무료로 시작하기
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LandingBanner