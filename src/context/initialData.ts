import type { 
  ChannelInfo, 
  Ambassador, 
  BudgetCategoryAllocation, 
  Expense, 
  DaySchedule, 
  Registration 
} from '../types';

export const INITIAL_CHANNELS: ChannelInfo[] = [
  {
    id: 'ambassador',
    name: 'College Ambassadors',
    target: 200,
    color: '#3b82f6', // Blue
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700 border-blue-200',
    description: 'On-ground student leaders running campus outreach in CSE/IT/AI-ML departments.'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Communities',
    target: 150,
    color: '#10b981', // Emerald
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-700 border-emerald-200',
    description: 'Direct drops in 3rd/4th year engineering batches, placement prep groups, and coding clubs.'
  },
  {
    id: 'instagram',
    name: 'Instagram Promotions',
    target: 75,
    color: '#ec4899', // Pink
    badgeBg: 'bg-pink-50',
    badgeText: 'text-pink-700 border-pink-200',
    description: 'Sponsored carousel posts, reels, and student creator partnerships highlighting AI portfolio.'
  },
  {
    id: 'referral',
    name: 'Email & Personal Referrals',
    target: 75,
    color: '#8b5cf6', // Violet
    badgeBg: 'bg-purple-50',
    badgeText: 'text-purple-700 border-purple-200',
    description: 'Peer-to-peer 1-on-1 invitations, alumni forwards, and departmental mailing lists.'
  }
];

export const INITIAL_BUDGET_CATEGORIES: BudgetCategoryAllocation[] = [
  {
    id: 'instagram_ads',
    name: 'Instagram Promotion Test',
    allocated: 800,
    color: '#ec4899',
    description: 'A/B micro-campaigns targeted at engineering colleges in Tier 1 & 2 hubs.'
  },
  {
    id: 'promotional_content',
    name: 'Promotional Content Expenses',
    allocated: 300,
    color: '#3b82f6',
    description: 'Motion graphic templates, project demo teaser video, and workshop banner assets.'
  },
  {
    id: 'ambassador_incentives',
    name: 'Ambassador Incentives',
    allocated: 500,
    color: '#10b981',
    description: 'Micro-rewards and Amazon gift cards for top-performing campus ambassadors.'
  },
  {
    id: 'contingency',
    name: 'Contingency Reserve',
    allocated: 400,
    color: '#f59e0b',
    description: 'Buffer reserved for late-stage retargeting or scaling whichever channel delivers best ROI.'
  }
];

export const INITIAL_EXPENSES: Expense[] = [
  {
    id: 'EXP-001',
    category: 'promotional_content',
    description: 'AI Project Teaser & Figma Banner Pack',
    amount: 200,
    date: '2026-10-25',
    day: 1
  },
  {
    id: 'EXP-002',
    category: 'promotional_content',
    description: 'WhatsApp viral copy & poster typography licensing',
    amount: 100,
    date: '2026-10-25',
    day: 1
  },
  {
    id: 'EXP-003',
    category: 'instagram_ads',
    description: 'Instagram Reel Ad Test A (Targeting CSE/IT 4th year)',
    amount: 350,
    date: '2026-10-26',
    day: 2
  },
  {
    id: 'EXP-004',
    category: 'ambassador_incentives',
    description: 'Campus Ambassador starter kit & early-bird incentive pool',
    amount: 250,
    date: '2026-10-27',
    day: 3
  },
  {
    id: 'EXP-005',
    category: 'instagram_ads',
    description: 'Instagram Carousel Ad Test B (Placement focus)',
    amount: 250,
    date: '2026-10-28',
    day: 4
  }
];

export const INITIAL_AMBASSADORS: Ambassador[] = [
  {
    id: 'AMB-101',
    name: 'Rahul Sharma',
    email: 'rahul.s@iith.ac.in',
    college: 'IIT Hyderabad',
    code: 'CAMP101',
    target: 50,
    joinedDay: 1
  },
  {
    id: 'AMB-102',
    name: 'Sneha Patel',
    email: 'sneha.patel@nitw.ac.in',
    college: 'NIT Warangal',
    code: 'CAMP102',
    target: 45,
    joinedDay: 1
  },
  {
    id: 'AMB-103',
    name: 'Priya Rao',
    email: 'priya.rao@cbit.edu.in',
    college: 'CBIT Hyderabad',
    code: 'CAMP103',
    target: 40,
    joinedDay: 1
  },
  {
    id: 'AMB-104',
    name: 'Aditya Verma',
    email: 'aditya.v@vnrvjiet.ac.in',
    college: 'VNR VJIET',
    code: 'CAMP104',
    target: 35,
    joinedDay: 2
  },
  {
    id: 'AMB-105',
    name: 'Ananya Reddy',
    email: 'ananya.reddy@jntuh.ac.in',
    college: 'JNTU College of Engineering',
    code: 'CAMP105',
    target: 30,
    joinedDay: 2
  }
];

export const INITIAL_SCHEDULE: DaySchedule[] = [
  {
    day: 1,
    title: 'Campaign Preparation & Tracking Setup',
    subtitle: 'Foundation & Asset Readiness',
    dateStr: 'Day 1 (2026-10-25)',
    suggestedMilestone: 35,
    focusChannels: ['ambassador', 'referral'],
    keyDeliverable: 'Finalize workshop curriculum teaser, setup UTM links, onboard 3 initial ambassadors.',
    activities: [
      'Finalize workshop registration landing page and referral tracking links',
      'Create promotional creative pack (posters, WhatsApp blurbs, Instagram reels)',
      'Onboard first batch of college ambassadors with codes CAMP101-CAMP103',
      'Seed personal network and student leader test registrations'
    ],
    completedTasks: [
      'Setup UTM parameters and referral codes',
      'Create Figma poster assets',
      'Onboard 3 campus ambassadors'
    ]
  },
  {
    day: 2,
    title: 'Ambassador & WhatsApp Outreach Launch',
    subtitle: 'High-Velocity Grassroots Blitz',
    dateStr: 'Day 2 (2026-10-26)',
    suggestedMilestone: 95,
    focusChannels: ['ambassador', 'whatsapp'],
    keyDeliverable: 'Activate 15 college batch WhatsApp groups; initiate campus ambassador pushes.',
    activities: [
      'College ambassadors push registration link into final-year CSE/IT batch groups',
      'Post workshop announcements in major coding club Discord & WhatsApp communities',
      'Begin tracking first wave of student registrations and referral leaderboard',
      'Deploy first ₹350 Instagram micro-test ad to test creative CTR'
    ],
    completedTasks: [
      'Post in 15 WhatsApp batch groups',
      'Launch Instagram Ad Test A'
    ]
  },
  {
    day: 3,
    title: 'Instagram Paid Promotion & Social Proof',
    subtitle: 'Expanding Top-of-Funnel Reach',
    dateStr: 'Day 3 (2026-10-27)',
    suggestedMilestone: 180,
    focusChannels: ['instagram', 'whatsapp'],
    keyDeliverable: 'Review Instagram Test A CTR; launch Carousel Ad Test B; share mentor credibility snippet.',
    activities: [
      'Publish organic workshop teaser reel on Instagram with "Build an AI App" theme',
      'Evaluate Instagram Test A metrics and launch optimized Test B targeting final-year tier-2 colleges',
      'Release mid-week ambassador leaderboard to spark healthy campus competition',
      'Share student project sneak-peeks on WhatsApp status and stories'
    ],
    completedTasks: [
      'Release Mid-Week Leaderboard',
      'Publish Organic Reels'
    ]
  },
  {
    day: 4,
    title: 'College Outreach Expansion & Referrals',
    subtitle: 'Mid-Campaign Acceleration (CURRENT SIMULATED DAY)',
    dateStr: 'Day 4 (2026-10-28)',
    suggestedMilestone: 290,
    focusChannels: ['ambassador', 'referral', 'whatsapp'],
    keyDeliverable: 'Engage IT/AI-ML departmental associations; trigger peer referral incentives.',
    activities: [
      'Onboard additional student reps from VNR VJIET and JNTUH (CAMP104, CAMP105)',
      'Launch "Invite 2 Batchmates" peer-referral challenge',
      'Run mid-campaign progress audit against the 500 registration target',
      'Host 10-minute live Q&A teaser in campus coding groups'
    ],
    completedTasks: [
      'Onboard Aditya (CAMP104) & Ananya (CAMP105)',
      'Trigger peer referral shoutouts'
    ]
  },
  {
    day: 5,
    title: 'Mid-Campaign Channel Performance Review',
    subtitle: 'Data-Driven Reallocation',
    dateStr: 'Day 5 (2026-10-29)',
    suggestedMilestone: 390,
    focusChannels: ['ambassador', 'whatsapp', 'instagram'],
    keyDeliverable: 'Identify top performing channel; reallocate remaining contingency budget.',
    activities: [
      'Analyze Cost Per Registration across Instagram vs Ambassador incentives',
      'Double down on top 2 performing ambassador campuses with bonus incentives',
      'Pause low-converting ad sets and reallocate ₹200 towards WhatsApp community moderators',
      'Send reminder email to students who registered but haven’t joined Discord community'
    ],
    completedTasks: []
  },
  {
    day: 6,
    title: 'Channel Prioritization & High-Urgency Reminders',
    subtitle: 'Urgency & Scarcity Drive',
    dateStr: 'Day 6 (2026-10-30)',
    suggestedMilestone: 460,
    focusChannels: ['whatsapp', 'ambassador', 'referral'],
    keyDeliverable: 'Trigger "Seats Filling Fast" messaging; activate final ambassador sprint.',
    activities: [
      'Broadcast "Only 50 seats remaining" countdown posts across all channels',
      'Ambassadors hold classroom desk announcements and laboratory group shoutouts',
      'Trigger second batch WhatsApp broadcast with workshop syllabus highlight',
      'Send personalized reminder messages to friend-referral lists'
    ],
    completedTasks: []
  },
  {
    day: 7,
    title: 'Final Campaign Push & Milestone Post-Mortem',
    subtitle: 'Goal Attainment & Debrief',
    dateStr: 'Day 7 (2026-10-31)',
    suggestedMilestone: 500,
    focusChannels: ['whatsapp', 'ambassador'],
    keyDeliverable: 'Cross 500 registrations threshold; deliver final participant roster to workshop mentors.',
    activities: [
      'Final 6-hour countdown broadcast across WhatsApp & Instagram stories',
      'Lock registrations once target of 500 is achieved',
      'Award Amazon gift cards to top 3 student ambassadors',
      'Conduct campaign post-mortem: calculate final CAC, channel ROI, and funnel conversion rates'
    ],
    completedTasks: []
  }
];

export function generateInitialRegistrations(): Registration[] {
  const colleges = [
    'IIT Hyderabad',
    'NIT Warangal',
    'CBIT Hyderabad',
    'VNR VJIET',
    'JNTU College of Engineering',
    'Vasavi College of Engineering',
    'BITS Pilani Hyderabad',
    'Osmania University College of Engg',
    'Gokaraju Rangaraju Institute (GRIET)',
    'Sreenidhi Institute of Science & Tech',
    'Chaitanya Bharathi Institute',
    'Mahatma Gandhi Institute of Tech (MGIT)'
  ];

  const branches = [
    'Computer Science & Engineering (CSE)',
    'Information Technology (IT)',
    'Artificial Intelligence & Machine Learning (AI & ML)',
    'Data Science & Analytics',
    'Electronics & Communication (ECE)'
  ];

  const firstNames = [
    'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan',
    'Dhruv', 'Siddharth', 'Pranav', 'Rohan', 'Harsha', 'Karthik', 'Nikhil', 'Manish', 'Tarun', 'Vikram',
    'Diya', 'Saanvi', 'Ananya', 'Aadhya', 'Pari', 'Anushka', 'Navya', 'Sneha', 'Pooja', 'Kavya',
    'Meera', 'Riya', 'Divya', 'Deepika', 'Keerthi', 'Shreya', 'Swathi', 'Bhavana', 'Priyanka', 'Tanvi',
    'Abhinav', 'Akhil', 'Teja', 'Charan', 'Varun', 'Gautam', 'Kunal', 'Sameer', 'Chirag', 'Yash',
    'Pavani', 'Rishika', 'Shruti', 'Archana', 'Nandini', 'Harini', 'Alekhya', 'Sirisha', 'Monika', 'Lalitha'
  ];

  const lastNames = [
    'Reddy', 'Sharma', 'Patel', 'Rao', 'Verma', 'Kumar', 'Goud', 'Chowdary', 'Gupta', 'Singh',
    'Nair', 'Iyer', 'Deshmukh', 'Joshi', 'Kulkarni', 'Bhat', 'Prasad', 'Mishra', 'Yadav', 'Mehta',
    'Agarwal', 'Chatterjee', 'Venkatesh', 'Naidu', 'Sastry', 'Varghese', 'Pillai', 'Menon', 'Shah', 'Pandey'
  ];

  const registrations: Registration[] = [];
  let regCounter = 1001;

  const distribution = [
    { day: 1, date: '2026-10-25', count: 34 },
    { day: 2, date: '2026-10-26', count: 68 },
    { day: 3, date: '2026-10-27', count: 86 },
    { day: 4, date: '2026-10-28', count: 96 }
  ];

  const ambassadorCodes = ['CAMP101', 'CAMP102', 'CAMP103', 'CAMP104', 'CAMP105'];

  distribution.forEach(({ day, date, count }) => {
    for (let i = 0; i < count; i++) {
      const fName = firstNames[(i * 3 + day * 7) % firstNames.length];
      const lName = lastNames[(i * 2 + day * 5 + regCounter) % lastNames.length];
      const fullName = `${fName} ${lName}`;
      const college = colleges[(i + day * 3) % colleges.length];
      const branch = branches[(i * 4 + day) % branches.length];
      const emailDomain = college.toLowerCase().replace(/[^a-z]/g, '').slice(0, 5) + '.edu.in';
      const email = `${fName.toLowerCase()}.${lName.toLowerCase()}${regCounter % 99}@${emailDomain}`;

      let channel: 'ambassador' | 'whatsapp' | 'instagram' | 'referral';
      let referralCode: string | undefined = undefined;

      const modVal = (i + day * 13) % 100;
      if (modVal < 45) {
        channel = 'ambassador';
        const codeIdx = (i + day) % ambassadorCodes.length;
        referralCode = ambassadorCodes[codeIdx];
      } else if (modVal < 75) {
        channel = 'whatsapp';
      } else if (modVal < 90) {
        channel = 'instagram';
      } else {
        channel = 'referral';
        if (i % 2 === 0) {
          referralCode = ambassadorCodes[(i + 1) % ambassadorCodes.length];
        }
      }

      const hour = 9 + ((i * 17) % 13);
      const min = (i * 23) % 60;
      const timestamp = `${date}T${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:00Z`;

      registrations.push({
        id: `REG-${regCounter}`,
        name: fullName,
        email: email,
        college: college,
        branch: branch,
        year: '4th Year (Final Year)',
        date: date,
        day: day,
        channel: channel,
        referralCode: referralCode,
        timestamp: timestamp
      });

      regCounter++;
    }
  });

  return registrations;
}
