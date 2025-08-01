import { useThemeStore } from "../store/useThemeStore"
import { THEMES } from "../../constants";

const PREVIEW_MESSAGES = [
    { id: 1, content: "Hey! How's it going?", isSent: false, time: "12:08 PM" },
    { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true, time: "12:09 PM" },
];

const SettingsPage = () => {
    const {theme, setTheme} = useThemeStore()
    
    return (
        <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
            <div className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold">Settings</h1>
                    <p className="text-base-content/70">Manage your chat preferences</p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Theme</h2>
                    <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
                    
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                        {THEMES.map((t) => (
                            <button
                                key={t}
                                className={`
                                    group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                                    ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
                                `}
                                onClick={() => setTheme(t)}
                            >
                                <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                                        <div className="rounded bg-primary"></div>
                                        <div className="rounded bg-secondary"></div>
                                        <div className="rounded bg-accent"></div>
                                        <div className="rounded bg-neutral"></div>
                                    </div>
                                </div>
                                <span className="text-[11px] font-medium truncate w-full text-center">
                                    {t.charAt(0).toUpperCase() + t.slice(1)}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-3">Preview</h3>
                        <div className="bg-base-200 border border-base-300 rounded-lg overflow-hidden max-w-md">
                            {/* User Header */}
                            <div className="bg-base-100 border-b border-base-300 p-3 flex items-center gap-3">
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-content font-semibold text-sm">
                                    J
                                </div>
                                <div>
                                    <div className="font-medium text-sm">John Doe</div>
                                    <div className="text-xs text-base-content/60">Online</div>
                                </div>
                            </div>
                            
                            {/* Messages */}
                            <div className="p-4 space-y-3">
                                {PREVIEW_MESSAGES.map((message) => (
                                    <div key={message.id}>
                                        <div className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}>
                                            <div
                                                className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                                                    message.isSent
                                                        ? "bg-primary text-primary-content"
                                                        : "bg-base-100 text-base-content border border-base-300"
                                                }`}
                                            >
                                                {message.content}
                                                <div className={`text-xs mt-1 ${
                                                    message.isSent ? "text-primary-content/70" : "text-base-content/50"
                                                }`}>
                                                    {message.time}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Input Area */}
                            <div className="bg-base-100 border-t border-base-300 p-3 flex items-center gap-2">
                                <div className="flex-1 bg-base-200 rounded-full px-3 py-2 text-sm text-base-content/60">
                                    This is a preview
                                </div>
                                <button className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-content">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    );
};

export default SettingsPage;
