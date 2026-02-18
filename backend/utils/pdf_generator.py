from fpdf import FPDF
import io

class ResumePDF(FPDF):
    def __init__(self, layout='modern', color_hex='#2563EB', font_type='sans'):
        super().__init__()
        self.layout_type = layout
        self.primary_color = self._hex_to_rgb(color_hex)
        self.font_type = font_type
        
    def _hex_to_rgb(self, hex_str):
        hex_str = hex_str.lstrip('#')
        return tuple(int(hex_str[i:i+2], 16) for i in (0, 2, 4))

    def setup_font(self, style='', size=11):
        # fpdf2 default fonts: helvetica, times, courier
        font_map = {
            'sans': 'helvetica',
            'serif': 'times',
            'mono': 'courier'
        }
        self.set_font(font_map.get(self.font_type, 'helvetica'), style=style, size=size)

def generate_pdf(data: dict, template_name: str) -> bytes:
    # Resolve layout from template_name (which is the layout id)
    layout = data.get('template', 'modern')
    color_hex = '#2563EB' # Default
    # In a full impl, we'd pass the color and font from frontend, but for now we'll use defaults based on layout
    
    pdf = ResumePDF(layout=layout, color_hex=color_hex)
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)
    
    personal = data.get('personal', {})
    
    if layout == 'modern':
        # Modern: Blue header, Sidebar-like flow
        pdf.setup_font("B", 24)
        pdf.set_text_color(*pdf.primary_color)
        pdf.cell(0, 12, personal.get('fullName', 'Name'), ln=True)
        
        pdf.setup_font("I", 14)
        pdf.set_text_color(100, 100, 100)
        pdf.cell(0, 10, personal.get('jobTitle', 'Title'), ln=True)
        
        pdf.setup_font("", 10)
        pdf.set_text_color(80, 80, 80)
        contact = f"{personal.get('email', '')} | {personal.get('phone', '')} | {personal.get('linkedin', '')}"
        pdf.cell(0, 8, contact, ln=True)
        pdf.ln(5)
        
        pdf.set_draw_color(*pdf.primary_color)
        pdf.line(10, pdf.get_y(), 200, pdf.get_y())
        pdf.ln(8)
    
    elif layout == 'classic':
        # Classic: Centered Header, Times New Roman (Serif)
        pdf.font_type = 'serif'
        pdf.setup_font("B", 20)
        pdf.set_text_color(0, 0, 0)
        pdf.cell(0, 10, personal.get('fullName', 'Name').upper(), align="C", ln=True)
        
        pdf.setup_font("", 11)
        pdf.cell(0, 6, personal.get('jobTitle', ''), align="C", ln=True)
        
        pdf.setup_font("", 10)
        contact = f"{personal.get('email', '')}  |  {personal.get('phone', '')}  |  {personal.get('linkedin', '')}"
        pdf.cell(0, 6, contact, align="C", ln=True)
        pdf.ln(5)
        pdf.line(40, pdf.get_y(), 170, pdf.get_y())
        pdf.ln(8)
    
    else: # Minimalist / Executive / Creative Fallback
        pdf.setup_font("B", 30)
        pdf.set_text_color(0, 0, 0)
        pdf.cell(0, 15, personal.get('fullName', 'Name'), ln=True)
        pdf.setup_font("", 12)
        pdf.set_text_color(*pdf.primary_color)
        pdf.cell(0, 10, personal.get('jobTitle', '').upper(), ln=True)
        pdf.ln(10)

    # Common Content (Experience, Education, Skills)
    # Summary
    if personal.get('summary'):
        pdf.setup_font("B", 12)
        pdf.set_text_color(*pdf.primary_color)
        pdf.cell(0, 8, "SUMMARY", ln=True)
        pdf.setup_font("", 11)
        pdf.set_text_color(50, 50, 50)
        pdf.multi_cell(0, 6, personal['summary'])
        pdf.ln(8)

    # Experience
    if data.get('experience'):
        pdf.setup_font("B", 12)
        pdf.set_text_color(*pdf.primary_color)
        pdf.cell(0, 8, "EXPERIENCE", ln=True)
        
        for exp in data['experience']:
            pdf.setup_font("B", 11)
            pdf.set_text_color(0, 0, 0)
            pdf.cell(140, 7, exp['title'])
            pdf.setup_font("I", 10)
            pdf.set_text_color(100, 100, 100)
            pdf.cell(0, 7, exp['date'], align="R", ln=True)
            
            pdf.setup_font("B", 10)
            pdf.set_text_color(70, 70, 70)
            pdf.cell(0, 6, exp['company'], ln=True)
            
            pdf.setup_font("", 10)
            pdf.set_text_color(50, 50, 50)
            pdf.multi_cell(0, 5, exp['description'])
            pdf.ln(4)
        pdf.ln(4)

    # Education
    if data.get('education'):
        pdf.setup_font("B", 12)
        pdf.set_text_color(*pdf.primary_color)
        pdf.cell(0, 8, "EDUCATION", ln=True)
        for edu in data['education']:
            pdf.setup_font("B", 10)
            pdf.set_text_color(0, 0, 0)
            pdf.cell(140, 6, edu.get('degree', ''))
            pdf.setup_font("", 10)
            pdf.cell(0, 6, edu.get('date', ''), align="R", ln=True)
            pdf.cell(0, 5, edu.get('school', ''), ln=True)
            pdf.ln(2)
        pdf.ln(4)

    # Skills
    if data.get('skills'):
        pdf.setup_font("B", 12)
        pdf.set_text_color(*pdf.primary_color)
        pdf.cell(0, 8, "SKILLS", ln=True)
        pdf.setup_font("", 10)
        pdf.set_text_color(50, 50, 50)
        pdf.multi_cell(0, 6, ", ".join(data['skills']))

    return bytes(pdf.output())
