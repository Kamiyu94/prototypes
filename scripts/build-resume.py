"""Build the curated public resume. Requires ReportLab; no private contact data."""
from pathlib import Path
import os
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

root=Path(__file__).resolve().parent.parent
font_dir=Path(os.environ.get('RESUME_FONT_DIR','/System/Library/Fonts/Supplemental'))
pdfmetrics.registerFont(TTFont('Resume',str(font_dir/'Arial.ttf')))
pdfmetrics.registerFont(TTFont('ResumeBold',str(font_dir/'Arial Bold.ttf')))
pdfmetrics.registerFontFamily('Resume',normal='Resume',bold='ResumeBold',italic='Resume',boldItalic='ResumeBold')
navy=HexColor('#0A1226');gold=HexColor('#78581E');muted=HexColor('#526074')
styles={
 'name':ParagraphStyle('name',fontName='ResumeBold',fontSize=27,leading=32,textColor=navy,spaceAfter=5),
 'tag':ParagraphStyle('tag',fontName='ResumeBold',fontSize=12,leading=17,textColor=gold,spaceAfter=7),
 'body':ParagraphStyle('body',fontName='Resume',fontSize=10,leading=14.6,textColor=navy,spaceAfter=7),
 'small':ParagraphStyle('small',fontName='Resume',fontSize=9,leading=13,textColor=muted,spaceAfter=7),
 'section':ParagraphStyle('section',fontName='ResumeBold',fontSize=11,leading=16,textColor=gold,spaceBefore=13,spaceAfter=8),
 'role':ParagraphStyle('role',fontName='ResumeBold',fontSize=10.7,leading=15,textColor=navy,spaceBefore=7,spaceAfter=3),
 'bullet':ParagraphStyle('bullet',fontName='Resume',fontSize=10,leading=14.6,textColor=navy,leftIndent=10,firstLineIndent=-10,spaceAfter=6),
}
items=[]
def p(text,style='body'):return Paragraph(text,styles[style])
def add(text,style='body'):items.append(p(text,style))
def role(title,context,points):
 items.append(KeepTogether([p(title,'role'),p(context,'small'),p('- '+points[0],'bullet')]))
 for point in points[1:]:add('- '+point,'bullet')
add('Kris Lu','name');add('Enterprise Transformation &amp; AI Adoption','tag')
add('<link href="https://kamiyu94.github.io/prototypes/" color="#345E86">Portfolio: kamiyu94.github.io/prototypes</link>  |  <link href="https://www.linkedin.com/in/kamiyux" color="#345E86">LinkedIn: linkedin.com/in/kamiyux</link>','small')
add('PROFILE','section')
add('Management-oriented transformation leader with 6+ years of project, product and people management experience. Built a 4-person data analysis team and managed organizations of up to 16 people. Connects business problems, governance and cross-functional delivery, with the technical fluency to turn ideas into working prototypes.')
add('Enterprise AI adoption  /  PMO governance  /  Team leadership  /  Business-IT translation','small')
add('CURRENT TRANSFORMATION WORK','section')
role('Digital Transformation Solution Architecture Manager','Digital transformation consulting team | Jun 2026 - Present',[
 'Full-time embedded engagement at a large restaurant group since Aug 2026, onsite five days per week as an external consultant. Collaborates with the Group CIO, Finance and IT teams to translate management direction and operational needs into actionable work.',
 'Establishes PMO project visibility through dashboards and reporting that bring together project status, owners, risks and next steps for management review.',
 'Designs demand intake and evidence retention workflows, including AI-assisted classification and human review. AI-assisted interpretation remains in testing; people retain final decisions.',
 'Coordinates TMS and WMS/SAP work across IT, logistics, Finance and vendors, clarifying requirements, system dependencies, responsibilities and follow-up actions.'
])
add('SELECTED WORK','section')
add('<b>PMO Intake Skill &amp; Review Workspace</b> - Source evidence, classification guidance and traceable human review. Independently rebuilt public demo with fictional data and prewritten AI suggestions.')
add('<b>Project Management Dashboard</b> - Project-level views of progress, risks and next actions, with a management reporting workflow. Public demo uses fictional data and has no connection to enterprise systems.')
add('<b>GenBI Mini</b> - Natural-language business questions with inspectable SQL, charts and calculation context. Scoped public demo uses fictional data and rule-based queries.')
add('Public demos demonstrate implementation and design decisions; they are not evidence of client production deployment or measured business outcomes.','small')
items.append(PageBreak())
add('Kris Lu','name');add('Leadership, delivery &amp; technical fluency','tag')
add('PREVIOUS EXPERIENCE','section')
role('Independent Digital Consultant','Self-employed | Nov 2025 - Jun 2026',[
 'Delivered web architecture and workflow solutions across corporate websites, learning platforms and payment-related operating flows.',
 'Used AI-assisted development, automation and APIs to turn business needs into working tools and prototypes.'
])
role('Project Director','Beyond Media Global | Nov 2024 - Oct 2025',[
 'Coordinated enterprise platform, workflow and data delivery across business and engineering teams.',
 'Worked in English with engineering teams in Indonesia and stakeholders across Hong Kong and US markets.'
])
role('Senior Project Manager','Galaxy Software Services | Feb 2024 - Nov 2024',[
 'Led customer discovery and requirements clarification, translating needs into specifications, wireframes and prototypes for architecture and UX handoff.'
])
role('Senior Manager in Technology and Growth','1111 Job Bank | Feb 2020 - Feb 2024',[
 'Built a 4-person data analysis team and managed organizations of up to 16 people, connecting analytical work with business needs.',
 'Led product work for an NLP voice-command service, including intent taxonomy, entity mapping, fallback behavior and database query rules.',
 'Worked with SQL, BigQuery and GA4 to support analytics integration and business decision-making.'
])
add('TECHNICAL FLUENCY','section')
add('AI-assisted prototyping with Python, REST APIs and automation; NLP product workflows; SQL collaboration, BigQuery and GA4. Uses technical understanding to frame tradeoffs, validate feasibility and coordinate delivery.')
add('ADDITIONAL PORTFOLIO WORK','section')
add('<b>HR Digital Platform:</b> workflow implementation and interactive system behavior; planning by Emily Ko, built by Kamiyu Lab. <b>VoxLog:</b> desktop transcription workspace with AI-assisted editing, summaries and exports.')
add('EDUCATION &amp; LANGUAGES','section')
add('BA, Information Communication - Tamkang University | 2003 - 2006<br/>Mandarin: native | English: professional working proficiency')
def footer(c,doc):
 c.setStrokeColor(HexColor('#CFD5DD'));c.line(46,39,549,39)
 c.setFont('Resume',8);c.setFillColor(muted);c.drawString(46,25,'Kris Lu | Public resume | Updated Oct 2026');c.drawRightString(549,25,str(doc.page))
output=root/'assets/resume/kris-lu-resume.pdf';output.parent.mkdir(exist_ok=True,parents=True)
SimpleDocTemplate(str(output),pagesize=(595.28,841.89),rightMargin=46,leftMargin=46,topMargin=38,bottomMargin=52,title='Kris Lu - Enterprise Transformation & AI Adoption',author='Kris Lu').build(items,onFirstPage=footer,onLaterPages=footer)
print(output)
