import { useThemeStore } from "../store/useThemeStore"
import { THEMES } from "../../constants";

const PREVIEW_MESSAGES = [
    {id: 1, content: "Hello, how are you?", isSent: false},
    {id: 2, content: "I'm good, thanks!", isSent: true}
]

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
                                <div className="relative h-8 w-full rounded-md overflow-hidden border border-base-300">
                                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-1" data-theme={t} style={{isolation: 'isolate'}}>
                                        <div className="rounded" style={{backgroundColor: 'hsl(var(--p))'}}></div>
                                        <div className="rounded" style={{backgroundColor: 'hsl(var(--s))'}}></div>
                                        <div className="rounded" style={{backgroundColor: 'hsl(var(--a))'}}></div>
                                        <div className="rounded" style={{backgroundColor: 'hsl(var(--n))'}}></div>
                                    </div>
                                </div>
                                <span className="text-[11px] font-medium truncate w-full text-center">
                                    {t.charAt(0).toUpperCase() + t.slice(1)}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-8">
                        <h3 className="text-md font-medium mb-3">Preview</h3>
                        <div className="bg-base-200 rounded-lg p-4 space-y-2">
                            {PREVIEW_MESSAGES.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-xs px-3 py-2 rounded-lg ${
                                            message.isSent
                                                ? "bg-primary text-primary-content"
                                                : "bg-base-300 text-base-content"
                                        }`}
                                    >
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    );
};

export default SettingsPage;
