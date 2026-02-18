import { useState } from 'react';
import { templates } from '../data/templateGallery';
import { colors } from '../data/templates';

const TemplateGallery = ({ onSelect, onBack }) => {
    const [filter, setFilter] = useState('all');

    const filteredTemplates = filter === 'all'
        ? templates
        : templates.filter(t => t.layout === filter || t.tags.includes(filter));

    // Simple visual representation of the template since we can't render 120 heavy previews
    const TemplateCard = ({ template }) => {
        const colorHex = colors.find(c => c.id === template.color)?.hex || '#ccc';

        return (
            <button
                onClick={() => onSelect(template)}
                className="group relative border rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-105 transition-all bg-white text-left flex flex-col h-64"
            >
                {/* Mock Preview Area */}
                <div className="flex-1 bg-gray-50 p-4 relative w-full overflow-hidden">

                    {/* Abstract representation of layout */}
                    <div className={`w-full h-full bg-white shadow-sm text-[6px] p-2 overflow-hidden ${template.font === 'serif' ? 'font-serif' : template.font === 'mono' ? 'font-mono' : 'font-sans'}`}>
                        {/* Header Mock */}
                        <div className={`mb-2 pb-1 ${template.layout === 'modern' ? 'border-b-2' : ''}`} style={{ borderColor: colorHex }}>
                            <div className="font-bold text-[8px]" style={{ color: colorHex }}>YOUR NAME</div>
                            <div className="text-gray-400">Software Engineer</div>
                        </div>

                        {/* Body Mock - Different per layout */}
                        <div className="space-y-1">
                            <div className="h-1 w-full bg-gray-200 rounded"></div>
                            <div className="h-1 w-3/4 bg-gray-200 rounded"></div>
                            <div className="h-1 w-5/6 bg-gray-200 rounded"></div>
                        </div>
                    </div>

                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 bg-white px-3 py-1 rounded-full text-xs font-bold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all">Select</span>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="p-3 border-t border-gray-100">
                    <h3 className="font-bold text-sm text-gray-800 truncate" title={template.name}>{template.name}</h3>
                    <p className="text-xs text-gray-500 capitalize">{template.layout} • {template.font}</p>
                </div>
            </button>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Choose a Template</h1>
                        <p className="text-gray-500">{templates.length} professional styles available</p>
                    </div>
                    <button onClick={onBack} className="text-gray-600 hover:text-black">Back to Editor</button>
                </header>

                <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
                    {['all', 'company', 'modern', 'classic', 'executive', 'minimalist', 'creative'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap ${filter === f ? 'bg-gray-900 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-200'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredTemplates.map(t => (
                        <TemplateCard key={t.id} template={t} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TemplateGallery;
