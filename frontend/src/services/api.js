import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const generatePDF = async (data, template) => {
    const response = await axios.post(`${API_URL}/generate/pdf`, { ...data, template }, {
        responseType: 'blob',
    });
    return response.data;
};

export const generateDOCX = async (data, template) => {
    const response = await axios.post(`${API_URL}/generate/docx`, { ...data, template }, {
        responseType: 'blob',
    });
    return response.data;
};

export const optimizeText = async (text) => {
    const response = await axios.post(`${API_URL}/ai/optimize`, { text });
    return response.data.optimized_text;
};

export const generateSummary = async (resumeData) => {
    const response = await axios.post(`${API_URL}/ai/summary`, resumeData);
    return response.data.summary;
};
