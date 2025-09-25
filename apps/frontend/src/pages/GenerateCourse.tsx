import { Eye, Sparkles, File, Video } from "lucide-react";

export default function GenerateCourse() {
    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">✨ Generate course with AI</h1>

            <div className="space-y-6">
                <div className="bg-white border rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Course outline</h2>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center border rounded-lg p-3">
                            <span>Introduction</span>
                            <Eye className="text-gray-400" />
                        </div>
                        <div className="flex justify-between items-center border rounded-lg p-3">
                            <span>Module 1</span>
                            <Sparkles className="text-purple-500" />
                        </div>
                    </div>
                </div>

                <div className="bg-white border rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Reference Documents</h2>
                    <div className="flex items-center gap-3 border rounded-lg p-3 mb-3">
                        <File className="text-orange-500" /> <span>.pptx</span>
                    </div>
                    <div className="flex items-center gap-3 border rounded-lg p-3">
                        <Video className="text-pink-500" /> <span>.mp4</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
