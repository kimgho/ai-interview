// login/register ->공통으로 사용하는 애임
// entities는 사용자 입장에서 실제로 인식할 수 있는 친구
// 게시판의 경우 게시글 (게시글이 뭔지 알 수 있음) post가 그래서 entities임
// entities/auth/ui 에 로그인 버튼, 컨테이너 를 넣고
// feature에서 entities를 참조할 수 있음
// feature/login
// feature/register
const LoginContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center  bg-white p-4">
            <div className="w-full max-w-md space-y-8">
                {children}
            </div>
        </div>
    )
}
export default LoginContainer