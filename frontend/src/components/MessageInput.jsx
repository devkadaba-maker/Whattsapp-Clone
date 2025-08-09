import { useState } from "react"
import { useRef } from "react"
import { X } from "lucide-react"
import { Image } from "lucide-react"
import { useChatStore } from "../store/useChatStore"
import toast from "react-hot-toast"

const MessageInput = () => {
    const [text, setText] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
    const fileInputRef = useRef(null)
    const { sendMessage } = useChatStore()


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")){
            toast.error("please select an image file")
            return
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result)
        }
        reader.readAsDataURL(file);
    }
    
    
    const removeImage = () => {
        setImagePreview(null)
        if(fileInputRef.current) fileInputRef.current.value = "";
        
    }
    const handleSendMessage = async(e) => {
        e.preventDefault()
        if (!text.trim() && !imagePreview) return
        try{
            await sendMessage({
                text:text.trim(),
                image:imagePreveiw
            })
            setText("")
            setImagePreveiw(null)
            if(fileInputRef.current) fileInputRef.current.value = ""
        }catch(error){
            toast.error(error.response?.data?.message || "error sending message")
        }
        
    }
    return (
         <div className="p-4 w-full">
              {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
                      flex items-center justify-center"
                      type="button"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                </div>
              )}
            <form onSubmit={handleSendMessage } className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2">
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                      />

                    <button
                        type="button"
                        className={`hidden sm:flex btn btn-circle
                                 ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                        onClick={() => fileInputRef.current?.click()}
                      ><Image size={20}/></button>
                </div>
                
                <button
                    type="submit"
                    className="btn btn-sm btn-circle"
                    disabled={!text.trim() && !imagePreview}
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                    </svg>
                </button>
            </form>
            
        </div>
    );
};
             
export default MessageInput;