import { layouts, colors, fonts } from './templates';

export const templates = [];

let idCounter = 1;

// Company Specific Presets
const companyPresets = [
    { name: 'Google Standard', layout: 'modern', color: 'slate', font: 'sans', tags: ['google', 'tech', 'faang'] },
    { name: 'Amazon Leadership', layout: 'mineralist', color: 'black', font: 'sans', tags: ['amazon', 'tech', 'faang'] }, // typo fix: minimalist
    { name: 'Goldman Sachs', layout: 'classic', color: 'blue', font: 'serif', tags: ['finance', 'banking', 'goldman'] },
    { name: 'McKinsey Consultant', layout: 'executive', color: 'black', font: 'serif', tags: ['consulting', 'mbb'] },
    { name: 'Apple Design', layout: 'minimalist', color: 'slate', font: 'sans', tags: ['apple', 'design', 'creative'] },
    { name: 'Netflix Culture', layout: 'modern', color: 'red', font: 'sans', tags: ['netflix', 'tech'] },
    { name: 'Tesla Innovation', layout: 'modern', color: 'red', font: 'mono', tags: ['tesla', 'automotive'] },
    { name: 'Microsoft Enterprise', layout: 'executive', color: 'blue', font: 'sans', tags: ['microsoft', 'tech'] },
];

companyPresets.forEach(preset => {
    templates.unshift({ // Add to top
        id: idCounter++,
        name: preset.name,
        layout: preset.layout === 'mineralist' ? 'minimalist' : preset.layout, // Correction
        color: preset.color,
        font: preset.font,
        tags: ['company', ...preset.tags]
    });
});

// Systematically generate combinations: 5 layouts * 8 colors * 3 fonts = 120 templates
layouts.forEach(layout => {
    colors.forEach(color => {
        fonts.forEach(font => {
            // Creative naming for the presets
            const name = `${color.name} ${layout.name} ${font.name.split(' ')[0]}`;

            templates.push({
                id: idCounter,
                name: name,
                layout: layout.id,
                color: color.id,
                font: font.id, // sans, serif, mono
                tags: [layout.id, color.id, font.id]
            });
            idCounter++;
        });
    });
});
