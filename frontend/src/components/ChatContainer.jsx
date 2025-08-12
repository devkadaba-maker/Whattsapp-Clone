import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";


const ChatContainer = () => {
    const {messages, getMessages, isMessagesLoading, selectedUser} = useChatStore();
    const { authUser } = useAuthStore();

    useEffect(() => {
        getMessages(selectedUser._id);
    }, [selectedUser._id, getMessages]);

    if (isMessagesLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto"> 
                <ChatHeader/>
                <MessageSkeleton/>
                <MessageInput/>
            
            </div>
        )
    }

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader/>
            <div className = 'flex-1 overflow-y-auto p-4 space-y-4'>
                {messages.map((message) =>(
                    <div
                        className={`chat ${message.senderId === authUser._id ? "chat-end" :"chat-start"} `}
                        key={message._id}>
                        
                        <div className = "chat-image avatar">
                            <div className = "size-10 rounded-full border">
                                <img src={message.senderId === authUser._id ? authUser.profilepic || "/avatar.png": selectedUser.profilepic || "/avatar.png"} alt= "profile pic"/>
                            </div>
                        </div>
                        <div className = "chat-header mb-1">
                            <time className = "text-xs text-base-content/70 opacity-50" >{message.createdAt}</time>
                        </div>
                        <div className="chat-bubble">
                            {message.text}
                        </div>
                    </div>
                ))}
            
            </div>
            <MessageInput/>
            
        </div>
    );
};

export default ChatContainer;