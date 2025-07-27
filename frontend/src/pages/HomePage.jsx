import { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import { useChatStore } from '../store/useChatStore'

const HomePage = () => {
  const { selectedUser } = useChatStore()

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? (
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="max-w-md text-center">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-primary/10 mx-auto mb-4">
                    <span className="text-3xl">💬</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Welcome to ChatApp!</h3>
                  <p className="text-base-content/60">
                    Select a conversation from the sidebar to start chatting
                  </p>
                </div>
              </div>
            ) : (
              <ChatContainer />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage