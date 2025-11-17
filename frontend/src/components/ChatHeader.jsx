import { XIcon, Trash2Icon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser, deleteChat, isMessagesLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null; // ⬅️ IMPORTANT FIX

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="flex justify-between items-center bg-slate-800/50 border-b border-slate-700/50 max-h-[84px] px-6 flex-1">
      
      <div className="flex items-center space-x-3">
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-12 rounded-full">
            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
          </div>
        </div>

        <div>
          <h3 className="text-slate-200 font-medium">{selectedUser.fullName}</h3>
          <p className="text-slate-400 text-sm">{isOnline ? "Online" : "Offline"}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">

        {/* SHOW DELETE BUTTON ONLY WHEN MESSAGES LOADED */}
        {!isMessagesLoading && (
          <button onClick={() => deleteChat(selectedUser._id)} title="Delete Chat">
            <Trash2Icon className="w-5 h-5 text-red-400 hover:text-red-200 cursor-pointer" />
          </button>
        )}

        <button onClick={() => setSelectedUser(null)}>
          <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 cursor-pointer" />
        </button>

      </div>
    </div>
  );
}

export default ChatHeader;
