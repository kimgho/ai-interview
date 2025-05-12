import { Button } from "@/shared/ui/button"

const LandingGuide = () => {
    return (
        <section id="how-it-works" className="py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                            사용 방법
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            간단한 3단계로 시작하세요
                        </h2>
                        <p className="max-w-[900px] mx-auto text-gray-500 md:text-xl">
                            AI를 사용하여 기술 면접을 준비하는 방법은 매우 간단합니다.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                            <span className="text-xl font-bold">1</span>
                        </div>
                        <h3 className="text-xl font-bold">계정 생성</h3>
                        <p className="text-gray-500">무료 계정을 만들고 관심 있는 기술 분야를 선택하세요.</p>
                    </div>
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                            <span className="text-xl font-bold">2</span>
                        </div>
                        <h3 className="text-xl font-bold">면접 시작</h3>
                        <p className="text-gray-500">원하는 분야에 대한 질문을 하세요.</p>
                    </div>
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                            <span className="text-xl font-bold">3</span>
                        </div>
                        <h3 className="text-xl font-bold">피드백 받기</h3>
                        <p className="text-gray-500">답변에 대한 평가를 받으려면, 답변을 중단하고 평가를 요청하세요.</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                        <a href="/login?tab=register">지금 시작하기</a>
                    </Button>
                </div>
            </div>
        </section>
    )
}
export default LandingGuide