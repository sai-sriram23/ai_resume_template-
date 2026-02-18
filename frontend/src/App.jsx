import { useState } from 'react'
import ResumeForm from './components/ResumeForm'
import TemplateGallery from './components/TemplateGallery'
import ResumePreview from './components/ResumePreview'
import { generatePDF, generateDOCX } from './services/api'

function App() {
  const [resumeData, setResumeData] = useState({
    personal: {},
    education: [],
    experience: [],
    skills: [],
    summary: ''
  })

  // New Config State
  const [config, setConfig] = useState({
    layout: 'modern',
    color: 'blue',
    font: 'sans',
    customColor: null
  })

  const [view, setView] = useState('editor') // editor, designer, preview

  // Helper to trigger download
  const handleDownload = async (type) => {
    try {
      const blob = type === 'pdf'
        ? await generatePDF(resumeData, config.layout)
        : await generateDOCX(resumeData, config.layout);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `resume.${type}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">

      {/* View: Editor */}
      {view === 'editor' && (
        <div className="max-w-7xl mx-auto p-8">
          <header className="flex justify-between items-end mb-10 pb-4 border-b border-gray-200">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                Resume<span className="text-blue-600">Gen</span>
              </h1>
              <p className="text-lg text-gray-500 mt-2 font-medium">Build your professional resume in minutes.</p>
            </div>
            <button
              onClick={() => setView('designer')}
              className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-black transition-all transform hover:-translate-y-1"
            >
              Choose Template →
            </button>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
            <div className="hidden lg:block sticky top-8 h-[800px] border rounded-xl overflow-hidden shadow-lg bg-gray-100">
              <div className="scale-[0.65] origin-top-left p-8">
                <ResumePreview data={resumeData} config={config} />
              </div>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] flex items-center justify-center">
                <p className="bg-white/80 px-4 py-2 rounded-full text-sm font-medium shadow-sm">Preview</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View: Gallery (was Designer) */}
      {view === 'designer' && (
        <TemplateGallery
          onSelect={(template) => {
            setConfig({
              layout: template.layout,
              color: template.color,
              font: template.font,
              customColor: null
            });
            setView('preview');
          }}
          onBack={() => setView('editor')}
        />
      )}

      {/* View: Final Preview */}
      {view === 'preview' && (
        <div className="h-screen flex flex-col">
          <header className="h-16 bg-white border-b flex items-center justify-between px-8 z-10">
            <button onClick={() => setView('designer')} className="text-gray-600 hover:text-black">← Back to Design</button>
            <div className="flex gap-4">
              <button
                onClick={() => handleDownload('docx')}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Download DOCX
              </button>
              <button
                onClick={() => handleDownload('pdf')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md"
              >
                Download PDF
              </button>
            </div>
          </header>
          <div className="flex-1 bg-gray-800 p-8 overflow-auto flex justify-center py-12">
            <div className="shadow-2xl rounded-sm">
              <ResumePreview data={resumeData} config={config} />
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default App
