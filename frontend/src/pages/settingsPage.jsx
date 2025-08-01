import { useThemeStore } from "../store/useThemeStore"
import { THEMES } from "../../constants";

const PREVIEW_MESSAGES = [
    { id: 1, content: "Hey! How's it going?", isSent: false },
    { id: 2, content: "I'm doing great, thanks for asking!", isSent: true },
    { id: 3, content: "That's awesome to hear!", isSent: false }
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
                        <div className="bg-base-100 border border-base-300 rounded-lg p-4 space-y-3 max-w-md">
                            {PREVIEW_MESSAGES.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
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
