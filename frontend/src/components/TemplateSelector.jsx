const TemplateSelector = ({ selectedTemplate, setSelectedTemplate }) => {
    const templates = [
        { id: 'modern', name: 'Modern', color: 'bg-blue-500' },
        { id: 'classic', name: 'Classic', color: 'bg-gray-700' },
        { id: 'creative', name: 'Creative', color: 'bg-purple-500' },
    ];

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Select Template</h2>
            <div className="grid grid-cols-2 gap-4">
                {templates.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setSelectedTemplate(t.id)}
                        className={`p-4 rounded-lg text-white font-bold h-32 flex items-center justify-center transition-transform hover:scale-105 ${t.color} ${selectedTemplate === t.id ? 'ring-4 ring-offset-2 ring-blue-400' : ''}`}
                    >
                        {t.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TemplateSelector;
