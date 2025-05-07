import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
} from "@/components/ui/sidebar"
import ChatHistoryItem from "./ChatHistoryItem"
import { useState } from "react"

const mockChatHistoryData = [
    { id: 1, title: "AI 기반 추천 시스템에 대해 알려줘", timestamp: "오늘, 14:23" },
    { id: 2, title: "React와 Next.js의 차이점은?", timestamp: "오늘, 11:05" },
    { id: 3, title: "머신러닝 모델 최적화 방법", timestamp: "어제, 16:42" },
    { id: 4, title: "데이터 시각화 라이브러리 추천", timestamp: "어제, 09:17" },
    { id: 5, title: "클라우드 서비스 비교 분석", timestamp: "5월 2일" },
    { id: 6, title: "웹 성능 최적화 기법", timestamp: "4월 28일" },
    { id: 7, title: "엄청 긴 채팅방 제목입니다람쥐람쥐람쥐람쥐람쥐람쥐람쥐", timestamp: "4월 28일" },
]

const ChatSidebar = () => {
    const [activeChat, setActiveChat] = useState<number | null>(1)
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="justify-center font-bold text-2xl my-3">History</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mockChatHistoryData.map((chat) => (
                                <ChatHistoryItem
                                    key={chat.id}
                                    title={chat.title}
                                    timestamp={chat.timestamp}
                                    isActive={activeChat === chat.id}
                                    onClick={() => setActiveChat(chat.id)}
                                />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default ChatSidebar
