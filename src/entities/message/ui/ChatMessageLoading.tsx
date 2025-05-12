import { useEffect, useState } from "react"

//AI가 서버에서 응답 가져올때동안 보여줄 UI느낌임
// entities/message/ui
export function ChatMessageLoading() {
    const [dots, setDots] = useState(1)

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev % 3) + 1)
        }, 500)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex w-full mb-4 justify-start">
            <div className="flex flex-col items-start max-w-[85%] sm:max-w-[75%] md:max-w-[65%] lg:max-w-[55%]">
                <div className="px-4 py-2.5 rounded-2xl bg-muted text-foreground rounded-tl-none">
                    <div className="flex items-center">
                        <span className="animate-pulse-opacity">답변을 생성중입니다</span>
                        <span className="w-[3ch] inline-block">{".".repeat(dots)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
