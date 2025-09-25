import { useState } from "react";

export default function Export() {
    const [audiences, setAudiences] = useState<string[]>([]);
    const [formats, setFormats] = useState<string[]>([]);

    const toggle = (list: string[], setList: any, value: string) => {
        if (list.includes(value)) {
            setList(list.filter((item) => item !== value));
        } else {
            setList([...list, value]);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Export</h1>

            {/* Audience */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm mb-6">
                <h2 className="text-xl font-semibold mb-4">
                    Select audience(s) you want to export
                </h2>
                <div className="flex flex-wrap gap-4">
                    {["All", "Admin", "Designer", "Project Manager"].map((aud) => (
                        <label
                            key={aud}
                            className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                checked={audiences.includes(aud)}
                                onChange={() => toggle(audiences, setAudiences, aud)}
                            />
                            {aud}
                        </label>
                    ))}
                </div>
            </div>

            {/* File format */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm mb-6">
                <h2 className="text-xl font-semibold mb-4">File format</h2>
                <div className="flex flex-wrap gap-4">
                    {["HTML", "Print", "ePub 3", "SCORM 1.2", "SCORM 2004", "LTI 1.3", "PDF"].map(
                        (fmt) => (
                            <label
                                key={fmt}
                                className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={formats.includes(fmt)}
                                    onChange={() => toggle(formats, setFormats, fmt)}
                                />
                                {fmt}
                            </label>
                        )
                    )}
                </div>
            </div>

            {/* CTA */}
            <div className="text-right">
                <button className="px-6 py-3 rounded-2xl bg-black text-white hover:bg-gray-800">
                    Generate Export
                </button>
            </div>
        </div>
    );
}
