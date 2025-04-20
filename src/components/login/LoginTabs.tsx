import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const tabLabel = [
    { value: "login", label: "로그인" },
    { value: "register", label: "회원가입" },
]

const LoginTabs = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setActiveTab] = useState<'login' | 'register'>("login");

    return (
        <Tabs
            defaultValue="login"
            className="w-full"
            onValueChange={(value) => setActiveTab(value as 'login' | 'register')}
        >
            <TabsList className="grid w-full grid-cols-2 rounded-md bg-gray-100">
                {tabLabel.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className='className="rounded-md cursor-pointer data-[state=active]:bg-white data-[state=active]:shadow-none"'
                    >
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            <div className="min-h-[500px]">
                <TabsContent value="login" className="space-y-4 pt-6">
                    <LoginForm />
                </TabsContent>

                <TabsContent value="register" className="space-y-4 pt-6">
                    <RegisterForm />
                </TabsContent>
            </div>
        </Tabs>
    );
}

export default LoginTabs