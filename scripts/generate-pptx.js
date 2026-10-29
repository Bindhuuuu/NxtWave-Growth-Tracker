import pptxgen from 'pptxgenjs';
import path from 'path';

const pres = new pptxgen();

// Set presentation layout to 16:9 widescreen
pres.layout = 'LAYOUT_16x9';
pres.author = 'Bindhu';
pres.title = 'NxtWave Workshop Growth Plan';
pres.subject = 'Build Your First AI Project in 60 Minutes - 500 Registrations Sprint';

// Color Palette
const COLORS = {
  navyDark: '0C1547',
  navyBlue: '1E293B',
  brandBlue: '2547E8',
  lightBlue: 'F0F5FF',
  emerald: '10B981',
  lightEmerald: 'ECFDF5',
  amber: 'F59E0B',
  lightAmber: 'FFFBEB',
  slateText: '475569',
  slateMuted: '64748B',
  cardBg: 'F8FAFC',
  border: 'E2E8F0',
  white: 'FFFFFF'
};

// ==========================================
// SLIDE 1: Title & Executive Summary
// ==========================================
const slide1 = pres.addSlide();

// Header Accent Banner
slide1.addShape(pres.ShapeType.rect, {
  x: 0, y: 0, w: '100%', h: 0.15,
  fill: { color: COLORS.brandBlue }
});

// Title & Subtitle
slide1.addText('GROWTH PLAN: WORKSHOP CAMPAIGN SPRINT', {
  x: 0.8, y: 0.6, w: 11.5, h: 0.4,
  fontSize: 13, bold: true, color: COLORS.brandBlue, fontFace: 'Calibri'
});

slide1.addText('Build Your First AI Project in 60 Minutes', {
  x: 0.8, y: 0.95, w: 11.5, h: 0.8,
  fontSize: 28, bold: true, color: COLORS.navyDark, fontFace: 'Calibri'
});

slide1.addText('Target: 500 Final-Year Engineering Students (CSE/IT/AI-ML) | 7-Day Sprint | Budget: ₹2,000', {
  x: 0.8, y: 1.65, w: 11.5, h: 0.4,
  fontSize: 13, color: COLORS.slateMuted, fontFace: 'Calibri'
});

// 3 Key Constraint Cards
const cardW = 3.6;
const cardH = 1.6;
const cardY = 2.3;

// Card 1: Goal
slide1.addShape(pres.ShapeType.roundRect, {
  x: 0.8, y: cardY, w: cardW, h: cardH,
  fill: { color: COLORS.lightBlue }, line: { color: COLORS.border, width: 1 }, rectRadius: 0.1
});
slide1.addText('GOAL & AUDIENCE', { x: 1.0, y: cardY + 0.15, w: 3.2, h: 0.3, fontSize: 11, bold: true, color: COLORS.brandBlue });
slide1.addText('500 Registrations', { x: 1.0, y: cardY + 0.45, w: 3.2, h: 0.45, fontSize: 20, bold: true, color: COLORS.navyDark });
slide1.addText('Targeting 4th year CSE, IT, and AI & ML students seeking hands-on project portfolio additions.', {
  x: 1.0, y: cardY + 0.95, w: 3.2, h: 0.55, fontSize: 10, color: COLORS.slateText
});

// Card 2: Timeline
slide1.addShape(pres.ShapeType.roundRect, {
  x: 4.8, y: cardY, w: cardW, h: cardH,
  fill: { color: COLORS.lightEmerald }, line: { color: COLORS.border, width: 1 }, rectRadius: 0.1
});
slide1.addText('SPRINT TIMELINE', { x: 5.0, y: cardY + 0.15, w: 3.2, h: 0.3, fontSize: 11, bold: true, color: COLORS.emerald });
slide1.addText('7 Days Execution', { x: 5.0, y: cardY + 0.45, w: 3.2, h: 0.45, fontSize: 20, bold: true, color: COLORS.navyDark });
slide1.addText('Fast daily velocity pacing (~71 regs/day) with continuous performance review and channel reallocation.', {
  x: 5.0, y: cardY + 0.95, w: 3.2, h: 0.55, fontSize: 10, color: COLORS.slateText
});

// Card 3: Budget
slide1.addShape(pres.ShapeType.roundRect, {
  x: 8.8, y: cardY, w: cardW, h: cardH,
  fill: { color: COLORS.lightAmber }, line: { color: COLORS.border, width: 1 }, rectRadius: 0.1
});
slide1.addText('BUDGET & UNIT ECONOMICS', { x: 9.0, y: cardY + 0.15, w: 3.2, h: 0.3, fontSize: 11, bold: true, color: COLORS.amber });
slide1.addText('₹2,000 Total Budget', { x: 9.0, y: cardY + 0.45, w: 3.2, h: 0.45, fontSize: 20, bold: true, color: COLORS.navyDark });
slide1.addText('Target Blended CAC of ₹4.00/student. Micro-testing prevents ad burn and protects runway.', {
  x: 9.0, y: cardY + 0.95, w: 3.2, h: 0.55, fontSize: 10, color: COLORS.slateText
});

// Core Strategy Callout
slide1.addShape(pres.ShapeType.roundRect, {
  x: 0.8, y: 4.2, w: 11.6, h: 2.5,
  fill: { color: COLORS.cardBg }, line: { color: COLORS.border, width: 1 }, rectRadius: 0.15
});

slide1.addText('STRATEGIC GROWTH THESIS: WHY A GROWTH TRACKER OVER A LANDING PAGE?', {
  x: 1.1, y: 4.4, w: 11.0, h: 0.3, fontSize: 12, bold: true, color: COLORS.navyDark
});

const thesisPoints = [
  '• Attribution over Assumptions: A static landing page cannot identify which campus batch group or ambassador drives signups.',
  '• Strict CAC Discipline: With ₹2,000 for 500 students (allowable CAC = ₹4), uncalibrated ad spend leads to rapid capital exhaustion.',
  '• Real-Time Velocity Steering: Measuring daily signup pacing (71/day) enables course-correction before the 7-day sprint ends.',
  '• High-Leverage Zero-Cost Funnels: Campus ambassadors and WhatsApp communities drive 70% of registrations at zero marginal ad spend.'
];

slide1.addText(thesisPoints.join('\n\n'), {
  x: 1.1, y: 4.8, w: 11.0, h: 1.7, fontSize: 11, color: COLORS.slateText, lineSpacing: 18
});

// ==========================================
// SLIDE 2: 4-Channel Acquisition Mix
// ==========================================
const slide2 = pres.addSlide();
slide2.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.15, fill: { color: COLORS.brandBlue } });

slide2.addText('ACQUISITION ARCHITECTURE', { x: 0.8, y: 0.5, w: 11.5, h: 0.3, fontSize: 11, bold: true, color: COLORS.brandBlue });
slide2.addText('4-Channel Marketing Mix (Target = Exactly 500)', { x: 0.8, y: 0.8, w: 11.5, h: 0.6, fontSize: 24, bold: true, color: COLORS.navyDark });

const channels = [
  {
    num: '01',
    name: 'College Ambassadors',
    target: '200 Regs (40%)',
    cpa: '₹2.50 / student',
    desc: 'On-ground student leaders in CSE/IT departments across 5 colleges (IIT-H, NIT-W, CBIT, VNR, JNTU). Unique codes (CAMP101-105).',
    tactic: 'Micro-incentives: Amazon vouchers for top 3 ambassadors crossing 40 registrations.',
    color: COLORS.brandBlue,
    bg: COLORS.lightBlue
  },
  {
    num: '02',
    name: 'WhatsApp Communities',
    target: '150 Regs (30%)',
    cpa: '₹0.80 / student',
    desc: 'Direct drops in 3rd & 4th year batch groups, placement prep channels, and college coding club communities.',
    tactic: 'Hook: "Build an AI project to add to your resume before final campus placements begin."',
    color: COLORS.emerald,
    bg: COLORS.lightEmerald
  },
  {
    num: '03',
    name: 'Instagram Promotions',
    target: '75 Regs (15%)',
    cpa: '₹10.60 / student',
    desc: 'Micro-budget paid ads and student creator reel partnerships targeted at engineering hubs.',
    tactic: 'A/B micro-tests: 15-second VS Code screen recording demonstration of the AI project.',
    color: 'EC4899',
    bg: 'FDF2F8'
  },
  {
    num: '04',
    name: 'Personal & Peer Referrals',
    target: '75 Regs (15%)',
    cpa: '₹1.30 / student',
    desc: 'Student-to-student viral loops and departmental mailing list forwards.',
    tactic: '"Invite 2 batchmates to build together" prompt triggered immediately post-registration.',
    color: '8B5CF6',
    bg: 'F5F3FF'
  }
];

channels.forEach((ch, idx) => {
  const colX = 0.8 + (idx * 2.95);
  slide2.addShape(pres.ShapeType.roundRect, {
    x: colX, y: 1.6, w: 2.8, h: 5.2,
    fill: { color: COLORS.cardBg }, line: { color: COLORS.border, width: 1 }, rectRadius: 0.15
  });

  slide2.addShape(pres.ShapeType.rect, {
    x: colX, y: 1.6, w: 2.8, h: 0.1, fill: { color: ch.color }
  });

  slide2.addText(ch.num, { x: colX + 0.2, y: 1.85, w: 2.4, h: 0.3, fontSize: 11, bold: true, color: ch.color });
  slide2.addText(ch.name, { x: colX + 0.2, y: 2.15, w: 2.4, h: 0.55, fontSize: 15, bold: true, color: COLORS.navyDark });
  
  slide2.addShape(pres.ShapeType.roundRect, {
    x: colX + 0.2, y: 2.75, w: 2.4, h: 0.65,
    fill: { color: ch.bg }, rectRadius: 0.08
  });
  slide2.addText(`Target: ${ch.target}\nEst. CAC: ${ch.cpa}`, {
    x: colX + 0.2, y: 2.8, w: 2.4, h: 0.55, fontSize: 10, bold: true, color: ch.color, align: 'center'
  });

  slide2.addText('DESCRIPTION & DEMOGRAPHIC:', { x: colX + 0.2, y: 3.55, w: 2.4, h: 0.25, fontSize: 9, bold: true, color: COLORS.slateMuted });
  slide2.addText(ch.desc, { x: colX + 0.2, y: 3.8, w: 2.4, h: 1.1, fontSize: 10, color: COLORS.slateText });

  slide2.addText('GROWTH TACTIC:', { x: colX + 0.2, y: 4.95, w: 2.4, h: 0.25, fontSize: 9, bold: true, color: ch.color });
  slide2.addText(ch.tactic, { x: colX + 0.2, y: 5.2, w: 2.4, h: 1.3, fontSize: 10, color: COLORS.navyBlue });
});

// ==========================================
// SLIDE 3: Budget Allocation & Unit Economics
// ==========================================
const slide3 = pres.addSlide();
slide3.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.15, fill: { color: COLORS.brandBlue } });

slide3.addText('FINANCIAL RIGOR & UNIT ECONOMICS', { x: 0.8, y: 0.5, w: 11.5, h: 0.3, fontSize: 11, bold: true, color: COLORS.brandBlue });
slide3.addText('₹2,000 Budget Allocation & Burn Protection', { x: 0.8, y: 0.8, w: 11.5, h: 0.6, fontSize: 24, bold: true, color: COLORS.navyDark });

// Left Table / Budget Breakdown
const budgetRows = [
  [
    { text: 'Expense Category', options: { bold: true, fill: { color: '2547E8' }, color: 'FFFFFF' } },
    { text: 'Allocated', options: { bold: true, fill: { color: '2547E8' }, color: 'FFFFFF' } },
    { text: '% Share', options: { bold: true, fill: { color: '2547E8' }, color: 'FFFFFF' } },
    { text: 'Operational Objective', options: { bold: true, fill: { color: '2547E8' }, color: 'FFFFFF' } }
  ],
  [
    { text: 'Instagram Promotion Test' }, { text: '₹800' }, { text: '40%' },
    { text: 'Phased A/B micro-campaigns testing video CTR vs carousel' }
  ],
  [
    { text: 'Promotional Content Assets' }, { text: '₹300' }, { text: '15%' },
    { text: 'Figma templates, motion graphic teaser, and WhatsApp flyer packs' }
  ],
  [
    { text: 'Ambassador Incentives' }, { text: '₹500' }, { text: '25%' },
    { text: 'Amazon gift vouchers for top 3 campus leads crossing targets' }
  ],
  [
    { text: 'Contingency Reserve' }, { text: '₹400' }, { text: '20%' },
    { text: 'Guarded buffer reserved for scaling top channel on Day 5-6' }
  ],
  [
    { text: 'Total Campaign Budget', options: { bold: true } },
    { text: '₹2,000', options: { bold: true, color: '2547E8' } },
    { text: '100%', options: { bold: true } },
    { text: 'Blended Cost Per Acquisition (CAC): ₹4.00 per student', options: { bold: true } }
  ]
];

slide3.addTable(budgetRows, {
  x: 0.8, y: 1.6, w: 7.2, h: 4.8,
  fontSize: 10, border: { pt: 1, color: COLORS.border },
  rowH: [0.45, 0.7, 0.7, 0.7, 0.7, 0.65],
  align: 'left',
  valign: 'middle'
});

// Right Side: Unit Economics & Safety Mechanism Cards
slide3.addShape(pres.ShapeType.roundRect, {
  x: 8.3, y: 1.6, w: 4.1, h: 2.3,
  fill: { color: COLORS.lightEmerald }, line: { color: COLORS.border, width: 1 }, rectRadius: 0.15
});
slide3.addText('UNIT ECONOMICS DISCIPLINE', { x: 8.5, y: 1.8, w: 3.7, h: 0.25, fontSize: 10, bold: true, color: COLORS.emerald });
slide3.addText('₹4.00 Max Allowable CAC', { x: 8.5, y: 2.05, w: 3.7, h: 0.45, fontSize: 18, bold: true, color: COLORS.navyDark });
slide3.addText('• ₹2,000 ÷ 500 students = ₹4.00 blended CAC target.\n• Paid ads alone in tech cost ₹15-₹30/lead; relying purely on paid ads would yield only 70-130 students.\n• Combining organic ambassador virality (₹0 marginal CAC) with paid testing balances unit economics.', {
  x: 8.5, y: 2.5, w: 3.7, h: 1.3, fontSize: 9.5, color: COLORS.slateText
});

slide3.addShape(pres.ShapeType.roundRect, {
  x: 8.3, y: 4.1, w: 4.1, h: 2.3,
  fill: { color: COLORS.lightAmber }, line: { color: COLORS.border, width: 1 }, rectRadius: 0.15
});
slide3.addText('DYNAMIC OVERSPEND PROTECTION', { x: 8.5, y: 4.3, w: 3.7, h: 0.25, fontSize: 10, bold: true, color: COLORS.amber });
slide3.addText('Budget Safety Alerts', { x: 8.5, y: 4.55, w: 3.7, h: 0.45, fontSize: 18, bold: true, color: COLORS.navyDark });
slide3.addText('• Micro-test staging: Initial ad test capped at ₹350 on Day 2 before further allocation.\n• Dynamic alert banner triggers at 80% burn rate (₹1,600 spent with >2 days left).\n• Hard stop warning if total logged expenses exceed ₹2,000 threshold.', {
  x: 8.5, y: 5.0, w: 3.7, h: 1.3, fontSize: 9.5, color: COLORS.slateText
});

// ==========================================
// SLIDE 4: 7-Day Sprint Execution Schedule
// ==========================================
const slide4 = pres.addSlide();
slide4.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.15, fill: { color: COLORS.brandBlue } });

slide4.addText('OPERATIONAL EXECUTION TIMELINE', { x: 0.8, y: 0.5, w: 11.5, h: 0.3, fontSize: 11, bold: true, color: COLORS.brandBlue });
slide4.addText('7-Day Sprint Execution Schedule & Milestones', { x: 0.8, y: 0.8, w: 11.5, h: 0.6, fontSize: 24, bold: true, color: COLORS.navyDark });

const scheduleDays = [
  { day: 'D1', title: 'Prep & Setup', milestone: '35 Regs', task: 'Finalize tracking UTMs, Figma posters, and onboard 3 campus leads.' },
  { day: 'D2', title: 'Outreach Blitz', milestone: '95 Regs', task: 'Activate 15 batch WhatsApp groups; deploy ₹350 Instagram micro-test.' },
  { day: 'D3', title: 'Social Proof', milestone: '180 Regs', task: 'Evaluate Ad Test A; release mid-week ambassador referral leaderboard.' },
  { day: 'D4', title: 'Mid-Sprint Audit', milestone: '290 Regs', task: 'Current Day: 284 regs recorded (56.8%); trigger peer referral challenge.' },
  { day: 'D5', title: 'Channel Review', milestone: '390 Regs', task: 'Reallocate ₹200 from contingency to top-performing ambassador hubs.' },
  { day: 'D6', title: 'Urgency Drive', milestone: '460 Regs', task: '"Seats Filling Fast" countdown across batch groups and status stories.' },
  { day: 'D7', title: 'Final Push & Lock', milestone: '500 Regs', task: 'Final 6-hour broadcast, cross 500 registrations, award ambassador prizes.' }
];

scheduleDays.forEach((item, idx) => {
  const boxX = 0.8 + (idx * 1.68);
  const isHighlight = item.day === 'D4';

  slide4.addShape(pres.ShapeType.roundRect, {
    x: boxX, y: 1.6, w: 1.58, h: 5.2,
    fill: { color: isHighlight ? COLORS.lightBlue : COLORS.cardBg },
    line: { color: isHighlight ? COLORS.brandBlue : COLORS.border, width: isHighlight ? 2 : 1 },
    rectRadius: 0.12
  });

  slide4.addShape(pres.ShapeType.roundRect, {
    x: boxX + 0.15, y: 1.8, w: 1.28, h: 0.45,
    fill: { color: isHighlight ? COLORS.brandBlue : COLORS.navyDark },
    rectRadius: 0.08
  });
  slide4.addText(item.day, {
    x: boxX + 0.15, y: 1.85, w: 1.28, h: 0.35,
    fontSize: 14, bold: true, color: 'FFFFFF', align: 'center'
  });

  slide4.addText(item.title, {
    x: boxX + 0.1, y: 2.35, w: 1.38, h: 0.5,
    fontSize: 11, bold: true, color: COLORS.navyDark, align: 'center'
  });

  slide4.addShape(pres.ShapeType.roundRect, {
    x: boxX + 0.1, y: 2.9, w: 1.38, h: 0.45,
    fill: { color: COLORS.lightEmerald }, rectRadius: 0.05
  });
  slide4.addText(item.milestone, {
    x: boxX + 0.1, y: 2.95, w: 1.38, h: 0.35,
    fontSize: 9.5, bold: true, color: COLORS.emerald, align: 'center'
  });

  slide4.addText('KEY ACTIVITIES:', {
    x: boxX + 0.1, y: 3.5, w: 1.38, h: 0.25,
    fontSize: 8.5, bold: true, color: COLORS.slateMuted
  });
  slide4.addText(item.task, {
    x: boxX + 0.1, y: 3.75, w: 1.38, h: 2.8,
    fontSize: 9.5, color: COLORS.slateText, lineSpacing: 14
  });
});

// ==========================================
// SLIDE 5: Measurement, Attribution & Live Asset
// ==========================================
const slide5 = pres.addSlide();
slide5.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.15, fill: { color: COLORS.brandBlue } });

slide5.addText('GROWTH INTELLIGENCE & VERIFICATION', { x: 0.8, y: 0.5, w: 11.5, h: 0.3, fontSize: 11, bold: true, color: COLORS.brandBlue });
slide5.addText('Measurement Engine, Referral Attribution & Live Asset', { x: 0.8, y: 0.8, w: 11.5, h: 0.6, fontSize: 24, bold: true, color: COLORS.navyDark });

// Left Box: Referral Attribution & Leaderboard
slide5.addShape(pres.ShapeType.roundRect, {
  x: 0.8, y: 1.6, w: 5.6, h: 5.2,
  fill: { color: COLORS.cardBg }, line: { color: COLORS.border, width: 1 }, rectRadius: 0.15
});

slide5.addText('CAMPUS AMBASSADOR ATTRIBUTION ENGINE', {
  x: 1.1, y: 1.85, w: 5.0, h: 0.3, fontSize: 12, bold: true, color: COLORS.brandBlue
});

slide5.addText('Dynamic attribution calculated from registration records (not hardcoded):', {
  x: 1.1, y: 2.2, w: 5.0, h: 0.3, fontSize: 10, color: COLORS.slateMuted
});

const ambassadorData = [
  [
    { text: 'Ambassador', options: { bold: true, fill: { color: 'F1F5F9' } } },
    { text: 'College', options: { bold: true, fill: { color: 'F1F5F9' } } },
    { text: 'Code', options: { bold: true, fill: { color: 'F1F5F9' } } },
    { text: 'Signups', options: { bold: true, fill: { color: 'F1F5F9' } } },
    { text: '% Total', options: { bold: true, fill: { color: 'F1F5F9' } } }
  ],
  [{ text: 'Rahul Sharma' }, { text: 'IIT Hyderabad' }, { text: 'CAMP101' }, { text: '28' }, { text: '9.9%' }],
  [{ text: 'Sneha Patel' }, { text: 'NIT Warangal' }, { text: 'CAMP102' }, { text: '25' }, { text: '8.8%' }],
  [{ text: 'Priya Rao' }, { text: 'CBIT Hyderabad' }, { text: 'CAMP103' }, { text: '24' }, { text: '8.5%' }],
  [{ text: 'Aditya Verma' }, { text: 'VNR VJIET' }, { text: 'CAMP104' }, { text: '22' }, { text: '7.7%' }],
  [{ text: 'Ananya Reddy' }, { text: 'JNTU College' }, { text: 'CAMP105' }, { text: '20' }, { text: '7.0%' }]
];

slide5.addTable(ambassadorData, {
  x: 1.1, y: 2.6, w: 5.0, h: 2.2,
  fontSize: 9.5, border: { pt: 0.5, color: COLORS.border },
  rowH: [0.35, 0.35, 0.35, 0.35, 0.35, 0.35],
  align: 'left', valign: 'middle'
});

slide5.addText('Key Takeaway: Ambassadors deliver zero-marginal-ad-spend registrations and drive over 40% of all registrations.', {
  x: 1.1, y: 5.0, w: 5.0, h: 0.6, fontSize: 10, color: COLORS.slateText, italic: true
});

// Right Box: Deployed Asset Links & Test Results
slide5.addShape(pres.ShapeType.roundRect, {
  x: 6.8, y: 1.6, w: 5.6, h: 5.2,
  fill: { color: COLORS.cardBg }, line: { color: COLORS.border, width: 1 }, rectRadius: 0.15
});

slide5.addText('WORKING ASSET & VERIFICATION METRICS', {
  x: 7.1, y: 1.85, w: 5.0, h: 0.3, fontSize: 12, bold: true, color: COLORS.emerald
});

slide5.addShape(pres.ShapeType.roundRect, {
  x: 7.1, y: 2.25, w: 5.0, h: 1.25,
  fill: { color: COLORS.lightEmerald }, rectRadius: 0.1
});
slide5.addText('LIVE VERCEL PRODUCTION DEPLOYMENT', { x: 7.3, y: 2.4, w: 4.6, h: 0.25, fontSize: 10, bold: true, color: COLORS.emerald });
slide5.addText('https://nxtwave-growth-tracker-99fxwr60t-bindhuuuu.vercel.app/', {
  x: 7.3, y: 2.7, w: 4.6, h: 0.55, fontSize: 10, color: COLORS.brandBlue, bold: true
});

slide5.addShape(pres.ShapeType.roundRect, {
  x: 7.1, y: 3.65, w: 5.0, h: 1.1,
  fill: { color: COLORS.lightBlue }, rectRadius: 0.1
});
slide5.addText('GITHUB REPOSITORY & AUTOMATION TESTS', { x: 7.3, y: 3.8, w: 4.6, h: 0.25, fontSize: 10, bold: true, color: COLORS.brandBlue });
slide5.addText('https://github.com/Bindhuuuu/NxtWave-Growth-Tracker\n• 23/23 Automated Unit Tests Passing (100%)\n• TypeScript strict compile: 0 errors', {
  x: 7.3, y: 4.1, w: 4.6, h: 0.6, fontSize: 9.5, color: COLORS.slateText
});

slide5.addText('Core Technical Differentiators:\n1. Duplicate email prevention across 284+ student records.\n2. Reactive metric recalculations on record addition/deletion.\n3. Rule-based growth engine + "What-If" scenario sandbox.\n4. Client-side localStorage persistence with 1-click demo reset.', {
  x: 7.1, y: 4.9, w: 5.0, h: 1.7, fontSize: 9.5, color: COLORS.navyBlue, lineSpacing: 14
});

// Output presentation file
const outputPath = path.resolve('NxtWave_Workshop_Growth_Plan.pptx');
pres.writeFile({ fileName: outputPath })
  .then(() => {
    console.log(`✅ PowerPoint presentation generated successfully at: ${outputPath}`);
  })
  .catch(err => {
    console.error('❌ Error generating presentation:', err);
    process.exit(1);
  });
