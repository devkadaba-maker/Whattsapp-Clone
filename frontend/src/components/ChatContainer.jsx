import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
	const {
		messages,
		getMessages,
		isMessagesLoading,
		selectedUser,
		subscribeToMessages,
		unsubscribeFromMessages,
	} = useChatStore();
    const { authUser } = useAuthStore();
   const messageEndRef = useRef(null);

    useEffect(() => {
        getMessages(selectedUser._id);

        subscribeToMessages();

        return () => unsubscribeFromMessages();
    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);
    useEffect(() => {
        if (messageEndRef.current && messages){
            messageEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    },[messages])
        

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
                        className={`chat ${message.senderId === authUser._id ? "chat-end" :"chat-start"}`}
                        key={message._id}>
                        
                        <div className = "chat-image avatar">
                            <div className = "size-10 rounded-full border">
                                <img
                                  src={
                                    message.senderId === authUser._id
                                      ? (authUser.profilepic || authUser.profilePic || "/avatar.png")
                                      : (selectedUser.profilepic || selectedUser.profilePic || "/avatar.png")
                                  }
                                  alt={message.senderId === authUser._id ? authUser.fullName : selectedUser.fullName}
                                />
                            </div>
                        </div>
                        <div className = "chat-header mb-1">
                            <time className = "text-xs text-base-content/70 opacity-50" >{formatMessageTime(message.createdAt)}</time>
                        </div>
                        <div className="chat-bubble flex flex-col">
                            {message.image && (
                                <img src={message.image} alt="message image" className="w-40 h-40 object-cover rounded-lg"/>
                            )}
                            {message.text}
                        </div>
                    </div>
                ))}
                <div ref={messageEndRef} />
            
            </div>
            <MessageInput/>
            
        </div>
    );
} 

export default ChatContainer;