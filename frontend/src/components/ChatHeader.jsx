
import { useChatStore } from '../store/useChatStore'

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore()

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img
                src={selectedUser.profilepic || '/avatar-placeholder.png'}
                alt={selectedUser.fullName}
              />
            </div>
          </div>
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">Online</p>
          </div>
        </div>

        <button onClick={() => setSelectedUser(null)} className="btn btn-sm btn-circle">
          ✕
        </button>
      </div>
    </div>
  )
}

export default ChatHeader
