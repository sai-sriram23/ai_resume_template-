import { colors, fonts } from '../data/templates';

const ResumePreview = ({ data, config }) => {
    const { personal, education, experience, skills } = data;
    const { layout, color, font, customColor } = config;

    // Resolve config to actual values
    const activeColor = customColor
        ? { hex: customColor, class: '' }
        : colors.find(c => c.id === color) || colors[0];

    const activeFont = fonts.find(f => f.id === font) || fonts[0];

    const containerStyle = {
        fontFamily: activeFont.id === 'sans' ? 'Inter, ui-sans-serif, system-ui' :
            activeFont.id === 'serif' ? 'Merriweather, Georgia, serif' :
                'monospace',
        color: '#1f2937' // gray-800
    };

    const primaryColorStyle = { color: activeColor.hex };
    const primaryBgStyle = { backgroundColor: activeColor.hex };
    const borderStyle = { borderColor: activeColor.hex };

    return (
        <div id="resume-preview" className="bg-white shadow-md mx-auto relative overflow-hidden text-left" style={{ width: '210mm', minHeight: '297mm', padding: '0', ...containerStyle }}>

            {/* === LAYOUT: MODERN === */}
            {layout === 'modern' && (
                <div className="p-12">
                    <header className="border-b-4 pb-6 mb-8" style={borderStyle}>
                        <h1 className="text-5xl font-bold uppercase tracking-wide" style={primaryColorStyle}>{personal.fullName || 'Your Name'}</h1>
                        <p className="text-2xl mt-2 text-gray-600 font-light">{personal.jobTitle || 'Job Title'}</p>
                        <div className="flex flex-wrap gap-6 mt-4 text-sm text-gray-500 font-medium">
                            {personal.email && <span>📧 {personal.email}</span>}
                            {personal.phone && <span>📱 {personal.phone}</span>}
                            {personal.linkedin && <span>🔗 {personal.linkedin}</span>}
                        </div>
                    </header>

                    <div className="flex gap-12">
                        <main className="flex-1 space-y-8">
                            {personal.summary && (
                                <section>
                                    <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-400">Profile</h3>
                                    <p className="border-l-4 pl-4 text-gray-700 leading-relaxed" style={borderStyle}>{personal.summary}</p>
                                </section>
                            )}

                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-wider mb-4 pb-2 border-b text-gray-400">Experience</h3>
                                {experience.length > 0 ? experience.map((exp, i) => (
                                    <div key={i} className="mb-6">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="font-bold text-lg" style={primaryColorStyle}>{exp.title}</h4>
                                            <span className="text-sm text-gray-500 whitespace-nowrap">{exp.date}</span>
                                        </div>
                                        <div className="text-sm font-semibold text-gray-700 mb-2">{exp.company}</div>
                                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                                    </div>
                                )) : <p className="text-gray-400 italic">Add experience to see it here.</p>}
                            </section>
                        </main>

                        <aside className="w-1/3 space-y-8">
                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-wider mb-4 pb-2 border-b text-gray-400">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, i) => (
                                        <span key={i} className="px-2 py-1 text-xs font-semibold text-white rounded shadow-sm" style={primaryBgStyle}>{skill}</span>
                                    ))}
                                    {skills.length === 0 && <p className="text-gray-400 italic">Add skills...</p>}
                                </div>
                            </section>
                            <section>
                                <h3 className="text-xs font-bold uppercase tracking-wider mb-4 pb-2 border-b text-gray-400">Education</h3>
                                {education.map((edu, i) => (
                                    <div key={i} className="mb-4">
                                        <div className="font-bold">{edu.degree}</div>
                                        <div className="text-sm text-gray-600">{edu.school}</div>
                                        <div className="text-xs text-gray-500 mt-1">{edu.date}</div>
                                    </div>
                                ))}
                            </section>
                        </aside>
                    </div>
                </div>
            )}

            {/* === LAYOUT: CLASSIC === */}
            {layout === 'classic' && (
                <div className="p-16">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-serif font-bold mb-2">{personal.fullName || 'Your Name'}</h1>
                        <p className="text-gray-600 mb-2">{personal.jobTitle}</p>
                        <div className="text-sm text-gray-500 flex justify-center gap-4">
                            <span>{personal.email}</span>
                            {personal.phone && <span>• {personal.phone}</span>}
                            {personal.linkedin && <span>• {personal.linkedin}</span>}
                        </div>
                    </div>
                    <hr className="my-6 border-gray-300" />

                    {personal.summary && (
                        <section className="mb-8">
                            <h3 className="text-md font-bold uppercase mb-3 pb-1" style={{ borderBottom: `2px solid ${activeColor.hex}`, color: activeColor.hex }}>Professional Profile</h3>
                            <p className="text-sm leading-relaxed text-justify">{personal.summary}</p>
                        </section>
                    )}
                    <section className="mb-8">
                        <h3 className="text-md font-bold uppercase mb-4 pb-1" style={{ borderBottom: `2px solid ${activeColor.hex}`, color: activeColor.hex }}>Experience</h3>
                        {experience.map((exp, i) => (
                            <div key={i} className="mb-6">
                                <div className="flex justify-between font-bold mb-1">
                                    <span>{exp.title}, {exp.company}</span>
                                    <span>{exp.date}</span>
                                </div>
                                <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">{exp.description}</p>
                            </div>
                        ))}
                    </section>
                </div>
            )}

            {/* === LAYOUT: MINIMALIST === */}
            {layout === 'minimalist' && (
                <div className="p-16 bg-white">
                    <header className="mb-12">
                        <h1 className="text-6xl font-light tracking-tighter mb-4" style={{ color: '#000' }}>{personal.fullName || 'Your Name'}</h1>
                        <div className="text-sm font-mono tracking-widest text-gray-500 uppercase mb-8">{personal.jobTitle}</div>
                        <div className="flex flex-col text-sm text-gray-400 space-y-1">
                            <span>{personal.email}</span>
                            <span>{personal.phone}</span>
                        </div>
                    </header>

                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-black">Skills</h3>
                            <ul className="space-y-2 text-sm text-gray-600 font-light">
                                {skills.map(s => <li key={s}>{s}</li>)}
                            </ul>
                        </div>
                        <div className="col-span-8 space-y-10">
                            {personal.summary && (
                                <p className="text-lg font-light leading-relaxed text-gray-800">{personal.summary}</p>
                            )}

                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-black">Experience</h3>
                                {experience.map((exp, i) => (
                                    <div key={i} className="mb-8 relative border-l border-gray-200 pl-6 ml-1">
                                        <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-black"></div>
                                        <h4 className="font-medium text-lg">{exp.title}</h4>
                                        <div className="text-sm text-gray-400 mb-2">{exp.company} — {exp.date}</div>
                                        <p className="text-sm text-gray-600 font-light">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* === LAYOUT: EXECUTIVE === */}
            {layout === 'executive' && (
                <div className="flex h-full min-h-[297mm]">
                    <div className="w-1/3 p-10 text-white flex flex-col" style={primaryBgStyle}>
                        <div className="mb-12 text-center">
                            <div className="w-32 h-32 bg-white/20 rounded-full mb-6 mx-auto flex items-center justify-center text-4xl font-serif">
                                {personal.fullName?.charAt(0) || 'U'}
                            </div>
                            <h1 className="text-3xl font-serif font-bold leading-tight mb-2">{personal.fullName}</h1>
                            <div className="w-10 h-1 bg-white/50 mx-auto mb-2"></div>
                            <p className="text-white/80 font-sans tracking-wide text-sm uppercase">{personal.jobTitle}</p>
                        </div>

                        <div className="space-y-8 flex-1">
                            <section>
                                <h4 className="font-bold border-b border-white/20 pb-2 mb-4 text-xs uppercase tracking-widest text-white/70">Contact Details</h4>
                                <ul className="text-sm space-y-3 font-light tracking-wide">
                                    <li className="flex items-center gap-3"><span className="opacity-50">✉</span> {personal.email}</li>
                                    <li className="flex items-center gap-3"><span className="opacity-50">📞</span> {personal.phone}</li>
                                    <li className="flex items-center gap-3"><span className="opacity-50">🔗</span> {personal.linkedin}</li>
                                </ul>
                            </section>

                            {education.length > 0 && (
                                <section>
                                    <h4 className="font-bold border-b border-white/20 pb-2 mb-4 text-xs uppercase tracking-widest text-white/70">Education</h4>
                                    {education.map((edu, i) => (
                                        <div key={i} className="mb-4 text-sm">
                                            <div className="font-bold">{edu.degree}</div>
                                            <div className="opacity-80">{edu.school}</div>
                                            <div className="opacity-60 text-xs">{edu.date}</div>
                                        </div>
                                    ))}
                                </section>
                            )}
                        </div>
                    </div>

                    <div className="w-2/3 p-12 bg-white text-gray-800">
                        {personal.summary && (
                            <section className="mb-10">
                                <h2 className="text-xl font-serif font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Executive Profile</h2>
                                <p className="text-gray-600 leading-relaxed font-serif">{personal.summary}</p>
                            </section>
                        )}

                        <section>
                            <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Professional Experience</h2>
                            {experience.map((exp, i) => (
                                <div key={i} className="mb-8">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="font-bold text-lg">{exp.title}</h3>
                                        <span className="text-sm font-serif italic text-gray-500">{exp.date}</span>
                                    </div>
                                    <div className="text-sm font-bold text-gray-600 mb-3" style={primaryColorStyle}>{exp.company}</div>
                                    <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
            )}

            {/* === LAYOUT: CREATIVE === */}
            {layout === 'creative' && (
                <div className="p-8 h-full min-h-[297mm] relative">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-bl-full opacity-10" style={primaryBgStyle}></div>

                    <div className="relative z-10 w-full max-w-2xl">
                        <h1 className="text-6xl font-black mb-2 leading-none" style={{ color: 'transparent', WebkitTextStroke: `2px ${activeColor.hex}` }}>
                            {personal.fullName?.split(' ')[0]}
                        </h1>
                        <h1 className="text-6xl font-black mb-6" style={primaryColorStyle}>
                            {personal.fullName?.split(' ').slice(1).join(' ')}
                        </h1>

                        <div className="bg-gray-900 text-white p-4 inline-block mb-12 rounded-lg shadow-xl origin-left transform -rotate-2">
                            <p className="text-xl font-bold tracking-widest uppercase">{personal.jobTitle}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-12 relative z-10">
                        <div className="space-y-12">
                            <section>
                                <div className="w-12 h-1 mb-4 bg-gray-900"></div>
                                <p className="text-lg font-medium leading-relaxed">{personal.summary}</p>
                            </section>

                            <section>
                                <h3 className="text-2xl font-black mb-6 text-gray-900">EXPERIENCE</h3>
                                {experience.map((exp, i) => (
                                    <div key={i} className="mb-8 border-l-4 pl-4 hover:pl-6 transition-all" style={{ borderColor: activeColor.hex }}>
                                        <div className="font-bold text-xl">{exp.title}</div>
                                        <div className="text-sm font-mono text-gray-500 mb-2">{exp.company} // {exp.date}</div>
                                        <p className="text-gray-600">{exp.description}</p>
                                    </div>
                                ))}
                            </section>
                        </div>

                        <div className="space-y-12 text-right">
                            <section>
                                <h3 className="text-2xl font-black mb-6 text-gray-900">CONTACT</h3>
                                <ul className="text-gray-600 font-mono text-sm space-y-2">
                                    <li>{personal.email}</li>
                                    <li>{personal.phone}</li>
                                    <li>{personal.linkedin}</li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-2xl font-black mb-6 text-gray-900">SKILLS</h3>
                                <div className="flex flex-wrap justify-end gap-3">
                                    {skills.map(s => (
                                        <span key={s} className="px-3 py-1 border-2 font-bold rounded-full" style={{ borderColor: activeColor.hex, color: activeColor.hex }}>
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ResumePreview;
