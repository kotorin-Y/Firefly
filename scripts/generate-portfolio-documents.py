from pathlib import Path
import re
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak

ROOT = Path(__file__).resolve().parents[1]
FONT = Path("C:/Windows/Fonts/msyh.ttc")
pdfmetrics.registerFont(TTFont("CN", str(FONT), subfontIndex=0))

DOCS = [
    ("ops-deputy-prd.md", "ops-deputy/ops-deputy-prd-zh-cn.pdf"),
    ("windows-motion-studio-prd.md", "windows-motion-studio/windows-motion-studio-prd-zh-cn.pdf"),
    ("stellar-blade-community-operations-plan.md", "stellar-blade-blood-rain/stellar-blade-blood-rain-community-operations-plan-zh-cn.pdf"),
]

def render(source: Path, target: Path):
    text = source.read_text(encoding="utf-8")
    title = next(line[2:] for line in text.splitlines() if line.startswith("# "))
    styles = getSampleStyleSheet()
    body = ParagraphStyle("BodyCN", parent=styles["BodyText"], fontName="CN", fontSize=10.5, leading=18, textColor=colors.HexColor("#243247"), spaceAfter=6)
    h1 = ParagraphStyle("TitleCN", parent=body, fontSize=24, leading=34, alignment=TA_CENTER, textColor=colors.HexColor("#176ea5"), spaceAfter=16)
    h2 = ParagraphStyle("H2CN", parent=body, fontSize=16, leading=23, textColor=colors.HexColor("#176ea5"), spaceBefore=12, spaceAfter=8)
    h3 = ParagraphStyle("H3CN", parent=body, fontSize=12.5, leading=19, textColor=colors.HexColor("#d65388"), spaceBefore=8)
    target.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(target), pagesize=A4, rightMargin=20*mm, leftMargin=20*mm, topMargin=18*mm, bottomMargin=18*mm, title=title, author="kotorin")
    story = [Spacer(1, 32*mm), Paragraph(title, h1), Paragraph("kotorin · 产品与运营作品集", ParagraphStyle("Sub", parent=body, alignment=TA_CENTER, textColor=colors.grey)), PageBreak()]
    for raw in text.splitlines()[1:]:
        line = raw.strip()
        if not line:
            story.append(Spacer(1, 3*mm))
        elif line.startswith("## "):
            story.append(Paragraph(line[3:], h2))
        elif line.startswith("### "):
            story.append(Paragraph(line[4:], h3))
        elif line.startswith("- "):
            story.append(Paragraph("• " + line[2:], body))
        else:
            story.append(Paragraph(re.sub(r"\*\*(.*?)\*\*", r"<b>\1</b>", line), body))
    def footer(canvas, document):
        canvas.saveState(); canvas.setFont("CN", 8); canvas.setFillColor(colors.grey)
        canvas.drawString(20*mm, 10*mm, "kotorin 个人作品集")
        canvas.drawRightString(A4[0]-20*mm, 10*mm, str(document.page)); canvas.restoreState()
    doc.build(story, onFirstPage=footer, onLaterPages=footer)

for src, dst in DOCS:
    render(ROOT / "src/content/resources" / src, ROOT / "public/downloads/portfolio" / dst)
