import { useState } from 'react';
import { layouts, colors, fonts } from '../data/templates';
import ResumePreview from './ResumePreview';

const Designer = ({ resumeData, config, setConfig, onBack, onNext }) => {
    const [activeTab, setActiveTab] = useState('layout'); // layout, color, font

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            {/* Sidebar Controls */}
            <div className="w-80 bg-white shadow-xl z-20 flex flex-col h-full border-r border-gray-200">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800">Designer</h2>
                    <p className="text-sm text-gray-500">Customize your look</p>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                    {['layout', 'color', 'font'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-3 text-sm font-medium capitalize ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Controls Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {activeTab === 'layout' && (
                        <div className="grid grid-cols-2 gap-3">
                            {layouts.map(l => (
                                <button
                                    key={l.id}
                                    onClick={() => setConfig({ ...config, layout: l.id })}
                                    className={`relative rounded-lg overflow-hidden border-2 transition-all ${config.layout === l.id ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                                        {/* Placeholder for layout thumbnail */}
                                        <span>{l.name}</span>
                                    </div>
                                    <div className="p-2 text-center text-xs font-semibold bg-white">{l.name}</div>
                                </button>
                            ))}
                        </div>
                    )}

                    {activeTab === 'color' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-4 gap-3">
                                {colors.map(c => (
                                    <button
                                        key={c.id}
                                        onClick={() => setConfig({ ...config, color: c.id })}
                                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-transform hover:scale-110 ${config.color === c.id ? 'border-gray-400 ring-2 ring-offset-2 ring-blue-500' : 'border-transparent'}`}
                                        style={{ backgroundColor: c.hex }}
                                        title={c.name}
                                    >
                                        {config.color === c.id && <span className="text-white drop-shadow-md">✓</span>}
                                    </button>
                                ))}
                            </div>
                            <div className="pt-4 border-t border-gray-100">
                                <label className="text-xs font-bold text-gray-500 uppercase">Custom Hex</label>
                                <div className="flex items-center mt-2 space-x-2">
                                    <input
                                        type="color"
                                        value={config.customColor || '#000000'}
                                        onChange={(e) => setConfig({ ...config, color: 'custom', customColor: e.target.value })}
                                        className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                                    />
                                    <span className="text-sm font-mono text-gray-600">{config.customColor || 'Select'}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'font' && (
                        <div className="space-y-2">
                            {fonts.map(f => (
                                <button
                                    key={f.id}
                                    onClick={() => setConfig({ ...config, font: f.id })}
                                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${f.family} ${config.font === f.id ? 'border-blue-600 bg-blue-50 text-blue-800' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <span className="text-lg">Aa</span>
                                    <span className="ml-3 font-medium">{f.name}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between">
                    <button onClick={onBack} className="px-4 py-2 text-gray-600 hover:text-gray-900">Back</button>
                    <button onClick={onNext} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors">
                        Preview & Download
                    </button>
                </div>
            </div>

            {/* Live Preview Area */}
            <div className="flex-1 bg-gray-200 p-8 overflow-auto flex justify-center items-start">
                <div className="scale-[0.6] sm:scale-[0.7] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 transition-transform origin-top">
                    <ResumePreview data={resumeData} config={config} />
                </div>
            </div>
        </div>
    );
};

export default Designer;
