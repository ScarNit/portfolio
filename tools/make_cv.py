import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_RIGHT
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

F = "/System/Library/Fonts/Supplemental/"
pdfmetrics.registerFont(TTFont("Arial", F + "Arial.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Bold", F + "Arial Bold.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Italic", F + "Arial Italic.ttf"))
pdfmetrics.registerFontFamily("Arial", normal="Arial", bold="Arial-Bold", italic="Arial-Italic")

INK = HexColor("#111111")
GREY = HexColor("#555555")
SIZE = 9.1
base = ParagraphStyle("base", fontName="Arial", fontSize=SIZE, leading=SIZE * 1.28, textColor=INK)
name = ParagraphStyle("name", parent=base, fontName="Arial-Bold", fontSize=22, leading=26)
sub = ParagraphStyle("sub", parent=base, fontSize=11, leading=15)
contact = ParagraphStyle("contact", parent=base, textColor=GREY, fontSize=9)
head = ParagraphStyle("head", parent=base, fontName="Arial-Bold", fontSize=9.6, spaceBefore=6, spaceAfter=1)
right = ParagraphStyle("right", parent=base, alignment=TA_RIGHT, textColor=GREY)
note = ParagraphStyle("note", parent=base, textColor=GREY)
bullet = ParagraphStyle("bullet", parent=base, leftIndent=10, bulletIndent=1)

W = A4[0] - 32 * mm - 12  # frame has 6pt padding each side
story = []

def section(title):
    story.append(Paragraph(title.upper(), head))
    story.append(HRFlowable(width="100%", thickness=0.7, color=INK, spaceBefore=1, spaceAfter=4))

def entry(left, when, sub_line=None, bullets=()):
    t = Table([[Paragraph(left, base), Paragraph(when, right)]], colWidths=[W - 40 * mm, 40 * mm], hAlign="LEFT")
    t.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                           ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                           ("VALIGN", (0, 0), (-1, -1), "TOP")]))
    story.append(t)
    if sub_line:
        story.append(Paragraph(sub_line, note))
    for b in bullets:
        story.append(Paragraph(b, bullet, bulletText="•"))
    story.append(Spacer(1, 3.5))

def link(url, text):
    return f'<link href="{url}" color="#111111">{text}</link>'

story.append(Paragraph("Tin Škarpa", name))
story.append(Paragraph("Game Developer (Unity, C#) | Computer Science Student", sub))
SEP = " &nbsp;|&nbsp; "
story.append(Paragraph(SEP.join([
    "Zagreb, Croatia",
    link("mailto:tinskarpa10@gmail.com", "tinskarpa10@gmail.com"),
    link("https://www.linkedin.com/in/tin-skarpa-587876273/", "linkedin.com/in/tin-skarpa-587876273"),
]), contact))
story.append(Paragraph(SEP.join([
    "Portfolio: " + link("https://scarnit.github.io/portfolio/", "scarnit.github.io/portfolio"),
    link("https://scarnit.itch.io", "scarnit.itch.io"),
    link("https://github.com/ScarNit", "github.com/ScarNit"),
]), contact))

section("Profile")
story.append(Paragraph(
    "Game developer with four released Unity games, including an entry to the Official Unity Game Jam 2026, "
    "and a Computer Science student at FER. I teach Unity and C# at Coding Giants. Looking for an internship "
    "or junior role in game or software development. Available immediately and open to on-site, hybrid or remote work.",
    base))

section("Projects")
entry("<b>Lucky Seven, Honest!</b> | Unity 6 (URP), C#, WebGL", "Nov 2026",
      "Entry to the Official Unity Game Jam 2026 (theme: Lucky Number), playable in the browser at scarnit.itch.io/lucky-seven-honest",
      ["Cartoon casino game: tip your die to a seven while the dealer looks away and reach 777 chips across a dice table, a VIP roulette and a slot machine",
       "Directed design and balance, added a guided tutorial after playtest feedback; used AI coding assistants for parts of the C# code, as disclosed on the game page"])
entry("<b>LAST STAND</b> | Unity 2D, C#", "2026",
      "Released as a browser game at scarnit.itch.io/last-stand",
      ["Tower defense game with 60 waves across four difficulty levels",
       "Designed 10 towers with four upgrade tiers, 10 enemy types and four multi-phase bosses"])
entry("<b>TRY: Punishing Dungeon Platformer</b> | Unity 2D, C#, PixelLab", "2026",
      "Released at scarnit.itch.io/try",
      ["Seven handcrafted levels with a per-level best-time tracker and automatic save",
       "Created all pixel art with PixelLab Pro; rated 5.0 / 5.0 on itch.io at release"])
entry("<b>Attack on Samurai</b> | Unity 2D, C#", "2023",
      "Solo final project for Machina Game Dev Academy, released at scarnit.itch.io/attack-on-samurai",
      ["2D action game with katana combat, wave-based enemies and a boss fight, from concept to release"])
entry("<b>SUSFER Website</b> | Volunteer web developer", "Oct 2026 – Present",
      None,
      ["Building the website for the sports association of FER students with AI site-building tools and code I write myself"])

section("Experience")
entry("<b>Online Unity and C# Teacher</b> | Coding Giants (remote, part-time)", "Oct 2026 – Present", None,
      ["Teach two live online classes of six students each: Unity for ages 13 to 15 and C# for ages 10 to 13"])
entry("<b>Sales Assistant</b> | Apple Premium Reseller, Zagreb", "Oct 2025 – Jun 2026", None,
      ["Advised customers on Mac, iPad, iPhone and Apple Watch, including device setup and data migration",
       "Troubleshot software issues in a high-volume store and met monthly sales targets for hardware, accessories and services"])
entry("<b>Lab Demonstrator, Digital Logic</b> | FER, Zagreb", "Oct 2024 – Feb 2025", None,
      ["Selected by the faculty as one of few first-year students to demonstrate a lab course; guided students through circuit simulation and troubleshooting"])
entry("<b>Aquapark Animator</b> | Skarpina, Vodice (seasonal)", "Jun 2021 – Sep 2026", None,
      ["Led guest entertainment and handled ticket sales, cash and customer service across five summer seasons"])

section("Education")
entry("<b>BSc Computer Science</b> | Faculty of Electrical Engineering and Computing (FER), University of Zagreb",
      "Oct 2024 – Jun 2027 (exp.)", "Study average 3.36 / 5.00",
      ["Coursework: Algorithms and Data Structures, Object-Oriented Programming, Operating Systems, "
       "Communication Networks, Databases, Web Software Development"])

section("Skills")
for line in [
    "<b>Game development:</b> Unity (2D, 3D, URP), C#, gameplay programming, game design, level design, balancing, WebGL builds, pixel art",
    "<b>Programming:</b> C#, C++, Python, JavaScript, Object-Oriented Programming, Algorithms and Data Structures",
    "<b>Web and tools:</b> HTML, CSS, React / Next.js, Git, GitHub, Visual Studio, VS Code, Codex and Claude Code (coding assistants), PixelLab",
]:
    story.append(Paragraph(line, base))

section("Certifications and languages")
story.append(Paragraph("Video Game Development with Unity Game Engine and C#, Machina Game Dev Academy, June 2023", base))
story.append(Paragraph("<b>Languages:</b> Croatian (native), English (C1)", base))

doc = SimpleDocTemplate(sys.argv[1], pagesize=A4, leftMargin=16 * mm, rightMargin=16 * mm,
                        topMargin=10 * mm, bottomMargin=8 * mm,
                        title="Tin Škarpa – CV", author="Tin Škarpa")
doc.build(story)
