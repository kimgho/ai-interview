import { CheckCircle2 } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { useNavigate } from "react-router-dom"

const LandingHero = () => {
    const navigate = useNavigate();

    return (
        <section className="py-12 md:py-24 lg:py-32 xl:py-36">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-1 lg:gap-12">
                    <div className="flex flex-col justify-center items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                                AI와 함께하는
                                <br />
                                <span className="text-emerald-600">기술 면접 준비</span>
                            </h1>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Button size="lg" onClick={() => navigate('/login')} className="bg-emerald-600 hover:bg-emerald-700">
                                무료로 시작하기
                            </Button>
                            <Button variant="outline" size="lg" onClick={() => navigate('#how-it-works')} >
                                사용 방법 알아보기
                            </Button>
                        </div>
                        <div className="flex items-center justify-center flex-wrap space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                <span>다양한 기술 분야</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                <span>무제한 연습</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default LandingHero