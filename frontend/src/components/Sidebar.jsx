import React, { useEffect } from 'react';
import SidebarSkeleton from './skeletons/SidebarSkeleton';
const Sidebar = () => {
const { users, getUsers, isUsersLoading, selectedUser, setSelectedUser } = useChatStore()
const onlineUsers = []
useEffect(() => {
if (isUsersLoading) return <SidebarSkeleton />
    },[getUsers])
    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
    <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
            <users className="size-6"/>
            <span className="font-medium hidden lg:block">Contacts</span>
        
        </div>
        {/*todo: online filter toggle*/}
        </div>
        </aside>
    );
};

export default Sidebar;