import type { Meta, StoryObj } from '@storybook/react';
import ChatSidebar from './ChatSidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar';

const meta: Meta<typeof ChatSidebar> = {
    component: ChatSidebar,
    decorators: (Story) => (
        <SidebarProvider>
            <div className="flex h-screen w-full">
                <Story />
                <SidebarInset className="flex flex-col flex-1">
                    <SidebarTrigger className="-ml-1 mt-2" />
                    <div className="flex-1 overflow-auto p-4 border-l">
                        <h1 className="text-xl font-bold">메인 컨텐츠 영역</h1>
                        <p className="mt-2 text-muted-foreground">사이드바의 접힘/펴짐 동작을 확인하기 위한 placeholder입니다.</p>
                        <div className="h-[1000px] bg-gray-100 dark:bg-gray-800 mt-4 p-4 rounded">
                            스크롤 영역
                        </div>
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    ),
    parameters: {
        layout: 'fullscreen',
    }
};

export default meta;
type Story = StoryObj<typeof ChatSidebar>;

export const Default: Story = {
    args: {
    },
};