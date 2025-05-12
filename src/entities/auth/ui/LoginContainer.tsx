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