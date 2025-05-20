import { postTerminateInterview } from "@/features/chat/service/interview";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/shared/ui/alert-dialog";
import { Button } from "@/shared/ui/button"
import { useState } from "react";
import { useParams } from "react-router";

const ChatTerminateButton = () => {
    const { id: routeSessionId } = useParams<{ id: string }>();
    const [isOpen, setIsOpen] = useState(false)

    const handleTerminateInterview = async (sessionId: number) => {
        try {
            postTerminateInterview(sessionId);
            setIsOpen(false);
        } catch (error) {
            console.error("인터뷰 종료 실패", error);
            setIsOpen(false);
        }

    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button variant={"default"} className="cursor-pointer">종료</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>인터뷰 종료</AlertDialogTitle>
                    <AlertDialogDescription>
                        인터뷰를 종료하시겠습니까? 종료 후에는 다시 시작할 수 없습니다.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>취소</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => handleTerminateInterview(Number(routeSessionId))}
                    >
                        확인
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default ChatTerminateButton;