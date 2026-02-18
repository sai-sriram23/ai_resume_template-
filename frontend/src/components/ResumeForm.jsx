import { useState } from 'react';
import { optimizeText, generateSummary } from '../services/api';

// Loading Spinner Component
const Spinner = () => (
    <svg className="animate-spin h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

// Reusable components for clean code
const SectionHeader = ({ title, isOpen, onClick, icon }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center justify-between p-4 bg-white border border-gray-200 ${isOpen ? 'rounded-t-lg border-b-0' : 'rounded-lg hover:border-gray-300'} transition-all`}
    >
        <div className="flex items-center gap-3">
            <span className="text-xl">{icon}</span>
            <span className="font-semibold text-gray-800">{title}</span>
        </div>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
    </button>
);

const InputField = ({ label, name, value, onChange, placeholder, type = "text", textarea = false, aiButton = null }) => (
    <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
            <label className="block text-gray-700 text-xs font-bold uppercase tracking-wide">{label}</label>
            {aiButton}
        </div>
        {textarea ? (
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-y"
                rows="4"
            />
        ) : (
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
        )}
    </div>
);

const ResumeForm = ({ resumeData, setResumeData }) => {
    const [activeSection, setActiveSection] = useState('personal');
    const [loading, setLoading] = useState({
        summary: false,
        experience: {} // { index: boolean }
    });

    const toggleSection = (section) => setActiveSection(activeSection === section ? null : section);

    // -- AI Handlers --
    const handleAIPolishSummary = async () => {
        if (!resumeData.personal.summary) return;
        setLoading(prev => ({ ...prev, summary: true }));
        try {
            const polished = await optimizeText(resumeData.personal.summary);
            setResumeData(prev => ({
                ...prev,
                personal: { ...prev.personal, summary: polished }
            }));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(prev => ({ ...prev, summary: false }));
        }
    };

    const handleAIGenerateSummary = async () => {
        setLoading(prev => ({ ...prev, summary: true }));
        try {
            const summary = await generateSummary(resumeData);
            setResumeData(prev => ({
                ...prev,
                personal: { ...prev.personal, summary: summary }
            }));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(prev => ({ ...prev, summary: false }));
        }
    };

    const handleAIPolishExperience = async (index) => {
        const text = resumeData.experience[index].description;
        if (!text) return;

        setLoading(prev => ({
            ...prev,
            experience: { ...prev.experience, [index]: true }
        }));

        try {
            const polished = await optimizeText(text);
            const newExp = [...resumeData.experience];
            newExp[index].description = polished;
            setResumeData(prev => ({ ...prev, experience: newExp }));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(prev => ({
                ...prev,
                experience: { ...prev.experience, [index]: false }
            }));
        }
    };

    // -- Handlers --
    const handlePersonalChange = (e) => {
        const { name, value } = e.target;
        setResumeData(prev => ({
            ...prev,
            personal: { ...prev.personal, [name]: value }
        }));
    };

    const handleArrayChange = (section, index, e) => {
        const { name, value } = e.target;
        const newArray = [...resumeData[section]];
        newArray[index] = { ...newArray[index], [name]: value };
        setResumeData(prev => ({ ...prev, [section]: newArray }));
    };

    const addItem = (section, item) => {
        setResumeData(prev => ({
            ...prev,
            [section]: [...prev[section], item]
        }));
    };

    const removeItem = (section, index) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }));
    };

    const handleSkillChange = (index, value) => {
        const newSkills = [...resumeData.skills];
        newSkills[index] = value;
        setResumeData(prev => ({ ...prev, skills: newSkills }));
    };

    // -- Render --
    return (
        <div className="space-y-4">

            {/* PERSONAL DETAILS */}
            <div>
                <SectionHeader
                    title="Personal Details"
                    icon="👤"
                    isOpen={activeSection === 'personal'}
                    onClick={() => toggleSection('personal')}
                />
                {activeSection === 'personal' && (
                    <div className="p-6 bg-white border border-t-0 border-gray-200 rounded-b-lg shadow-sm animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Full Name" name="fullName" value={resumeData.personal.fullName || ''} onChange={handlePersonalChange} placeholder="John Doe" />
                            <InputField label="Job Title" name="jobTitle" value={resumeData.personal.jobTitle || ''} onChange={handlePersonalChange} placeholder="Software Engineer" />
                            <InputField label="Email" name="email" value={resumeData.personal.email || ''} onChange={handlePersonalChange} placeholder="john@example.com" type="email" />
                            <InputField label="Phone" name="phone" value={resumeData.personal.phone || ''} onChange={handlePersonalChange} placeholder="+1 234 567 890" />
                            <InputField label="LinkedIn" name="linkedin" value={resumeData.personal.linkedin || ''} onChange={handlePersonalChange} placeholder="linkedin.com/in/johndoe" />
                            <InputField label="Website" name="website" value={resumeData.personal.website || ''} onChange={handlePersonalChange} placeholder="johndoe.com" />
                        </div>
                        <div className="mt-6">
                            <InputField
                                label="Profile Summary"
                                name="summary"
                                value={resumeData.personal.summary || ''}
                                onChange={handlePersonalChange}
                                placeholder="Write a brief intro or use AI to generate one..."
                                textarea
                                aiButton={
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleAIPolishSummary}
                                            disabled={loading.summary || !resumeData.personal.summary}
                                            className="text-[10px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-800 disabled:text-gray-400 transition-colors"
                                        >
                                            {loading.summary ? <Spinner /> : '✨ Polish'}
                                        </button>
                                        <button
                                            onClick={handleAIGenerateSummary}
                                            disabled={loading.summary}
                                            className="text-[10px] font-bold text-purple-600 flex items-center gap-1 hover:text-purple-800 disabled:text-gray-400 transition-colors"
                                        >
                                            {loading.summary ? <Spinner /> : '🪄 Magic Write'}
                                        </button>
                                    </div>
                                }
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* EXPERIENCE */}
            <div>
                <SectionHeader
                    title="Experience"
                    icon="💼"
                    isOpen={activeSection === 'experience'}
                    onClick={() => toggleSection('experience')}
                />
                {activeSection === 'experience' && (
                    <div className="p-6 bg-white border border-t-0 border-gray-200 rounded-b-lg shadow-sm animate-fadeIn">
                        {resumeData.experience.map((exp, index) => (
                            <div key={index} className="mb-8 pb-8 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0 relative">
                                <button onClick={() => removeItem('experience', index)} className="absolute top-0 right-0 text-red-400 hover:text-red-600 font-bold text-xl" title="Remove">×</button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField label="Job Title" name="title" value={exp.title || ''} onChange={(e) => handleArrayChange('experience', index, e)} placeholder="Senior Developer" />
                                    <InputField label="Company" name="company" value={exp.company || ''} onChange={(e) => handleArrayChange('experience', index, e)} placeholder="Tech Corp" />
                                    <InputField label="Dates" name="date" value={exp.date || ''} onChange={(e) => handleArrayChange('experience', index, e)} placeholder="Jan 2020 - Present" />
                                </div>
                                <div className="mt-4">
                                    <InputField
                                        label="Description"
                                        name="description"
                                        value={exp.description || ''}
                                        onChange={(e) => handleArrayChange('experience', index, e)}
                                        placeholder="Describe your achievements..."
                                        textarea
                                        aiButton={
                                            <button
                                                onClick={() => handleAIPolishExperience(index)}
                                                disabled={loading.experience[index] || !exp.description}
                                                className="text-[10px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-800 disabled:text-gray-400 transition-colors"
                                            >
                                                {loading.experience[index] ? <Spinner /> : '✨ Polish with AI'}
                                            </button>
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => addItem('experience', { title: '', company: '', date: '', description: '' })}
                            className="w-full py-3 mt-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 font-bold hover:border-blue-500 hover:text-blue-500 transition-colors"
                        >
                            + Add Experience
                        </button>
                    </div>
                )}
            </div>

            {/* EDUCATION */}
            <div>
                <SectionHeader
                    title="Education"
                    icon="🎓"
                    isOpen={activeSection === 'education'}
                    onClick={() => toggleSection('education')}
                />
                {activeSection === 'education' && (
                    <div className="p-6 bg-white border border-t-0 border-gray-200 rounded-b-lg shadow-sm animate-fadeIn">
                        {resumeData.education.map((edu, index) => (
                            <div key={index} className="mb-6 pb-6 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0 relative">
                                <button onClick={() => removeItem('education', index)} className="absolute top-0 right-0 text-red-400 hover:text-red-600 font-bold text-xl" title="Remove">×</button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField label="Degree" name="degree" value={edu.degree || ''} onChange={(e) => handleArrayChange('education', index, e)} placeholder="BS Computer Science" />
                                    <InputField label="School" name="school" value={edu.school || ''} onChange={(e) => handleArrayChange('education', index, e)} placeholder="University of Tech" />
                                    <InputField label="Date" name="date" value={edu.date || ''} onChange={(e) => handleArrayChange('education', index, e)} placeholder="2016 - 2020" />
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => addItem('education', { degree: '', school: '', date: '' })}
                            className="w-full py-3 mt-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 font-bold hover:border-blue-500 hover:text-blue-500 transition-colors"
                        >
                            + Add Education
                        </button>
                    </div>
                )}
            </div>

            {/* SKILLS */}
            <div>
                <SectionHeader
                    title="Skills"
                    icon="⚡"
                    isOpen={activeSection === 'skills'}
                    onClick={() => toggleSection('skills')}
                />
                {activeSection === 'skills' && (
                    <div className="p-6 bg-white border border-t-0 border-gray-200 rounded-b-lg shadow-sm animate-fadeIn">
                        <div className="flex flex-wrap gap-3">
                            {resumeData.skills.map((skill, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="text"
                                        value={skill}
                                        onChange={(e) => handleSkillChange(index, e.target.value)}
                                        className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-40"
                                        placeholder="Skill"
                                    />
                                    <button
                                        onClick={() => {
                                            const newSkills = resumeData.skills.filter((_, i) => i !== index);
                                            setResumeData(prev => ({ ...prev, skills: newSkills }));
                                        }}
                                        className="px-3 py-2 bg-red-50 text-red-500 border border-l-0 border-gray-200 rounded-r-lg hover:bg-red-100 font-bold"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setResumeData(prev => ({ ...prev, skills: [...prev.skills, ''] }))}
                            className="mt-4 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 font-medium transition-colors"
                        >
                            + Add Skill
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
};

export default ResumeForm;
