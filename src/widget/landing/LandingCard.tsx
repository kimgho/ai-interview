import { Code, Brain, MessageSquare } from "lucide-react"
import { Card, CardContent } from "@/shared/ui/card"

const LandingCard = () => {
    return (
        <section id="features" className="bg-gray-50 py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                            주요 기능
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">AI 기술 면접의 모든 것</h2>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="border-2 border-transparent transition-all hover:border-emerald-500">
                        <CardContent className="p-6 text-center">
                            <div className="flex justify-center">
                                <Code className="h-10 w-10 text-emerald-600 mb-4" />
                            </div>
                            <h3 className="text-xl font-bold">다양한 기술 분야</h3>
                            <p className="text-gray-500 mt-2">
                                JavaScript, React, Python, Java, System Design 등 다양한 기술 분야의 면접 질문을 연습할 수 있습니다.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-2 border-transparent transition-all hover:border-emerald-500">
                        <CardContent className="p-6 text-center">
                            <div className="flex justify-center">
                                <Brain className="h-10 w-10 text-emerald-600 mb-4" />
                            </div>
                            <h3 className="text-xl font-bold">AI 맞춤형 피드백</h3>
                            <p className="text-gray-500 mt-2">
                                AI가 실시간으로 답변을 분석하고 개선점과 함께 맞춤형 피드백을 제공합니다.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-2 border-transparent transition-all hover:border-emerald-500">
                        <CardContent className="p-6 text-center">
                            <div className="flex justify-center">
                                <MessageSquare className="h-10 w-10 text-emerald-600 mb-4" />
                            </div>
                            <h3 className="text-xl font-bold">대화형 연습</h3>
                            <p className="text-gray-500 mt-2">
                                AI와 자연스러운 대화를 통해 편안한 분위기에서 지식을 평가받을 수 있습니다.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default LandingCard