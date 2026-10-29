# ⚡ NxtWave Workshop Growth Intelligence Dashboard
> **Growth Intern Challenge Simulation:** "Build Your First AI Project in 60 Minutes"

A modern, responsive, and functional Growth Intelligence Dashboard engineered to help a growth intern plan marketing campaigns, track simulated registrations, analyze ambassador referral performance, monitor a ₹2,000 budget, and make data-driven decisions.

---

## 📌 Campaign Overview & Business Challenge

- **Workshop Title:** *"Build Your First AI Project in 60 Minutes"*
- **Target Audience:** Final-year engineering students (CSE, IT, AI & ML, ECE)
- **Target Registrations:** 500 Students
- **Campaign Duration:** 7 Days
- **Total Budget:** ₹2,000 (INR)
- **Mode:** Simulated Prototype. All student records, metrics, and campaign outputs are simulated for prototype evaluation.

---

## 💡 Strategic Decision: Why More Than a Landing Page?

> *"AI suggested building a simple landing page and using multiple marketing channels to promote the workshop. However, I decided not to limit my solution to a landing page because it would not help me understand which channels were actually generating registrations.*
>
> *Instead, I built a Workshop Growth Tracker with registration analytics, referral tracking, budget monitoring, and growth insights. I also avoided spending the entire budget on paid advertisements without first checking their effectiveness.*
>
> *My reason was simple: with a target of 500 registrations, a seven-day timeline, and a budget of ₹2,000, I wanted a solution that could measure results and help make better decisions. I used AI to speed up development, but I made the final decisions based on the campaign's goals and constraints."*

### The 4 Growth Engineering Pillars
1. **Attribution over Assumptions**: A static landing page is a black box. Without tracking which specific ambassador (`CAMP101`–`CAMP105`) or community generated the student, a growth intern cannot double down on what works.
2. **Strict Unit Economics (₹4 allowable CAC)**: With ₹2,000 to acquire 500 students, the target blended CAC is ₹4/student. Burning ₹2,000 blindly on Instagram ads without testing would risk immediate budget failure. Instead, we phased ₹350 into creative micro-tests and leveraged low-cost campus ambassador incentives (₹500) and contingency buffers (₹400).
3. **Daily Velocity Steering**: In a 7-day sprint, waiting until Day 7 to review numbers is fatal. Real-time velocity tracking (71.0 regs/day pace on Day 4) enables timely pivots.
4. **AI-Accelerated, Human-Steered**: AI was used to accelerate development and component creation, while human strategic judgment steered constraint modeling, unit economics, and campaign strategy.

---

## 🚀 Key Features Implemented

### 1. 📊 Executive Overview Dashboard
- **Live Target Progress Bar:** Tracks progress towards 500 registrations with milestone checkpoints (Kickoff, 25%, 50%, 75%, 100%).
- **Sprint KPIs:** Total registrations, remaining needed, target completion percentage (56.8%), and days remaining.
- **Velocity Tracker:** Registrations per day velocity (71.0 regs/day) and projected finish forecast.
- **Daily Trend Chart:** Bar chart comparing daily registrations across Day 1–7 against suggested daily targets.
- **Channel Breakdown Donut:** Real-time distribution and progress across all 4 acquisition funnels.
- **Recent Registrations Feed:** Live stream of latest fictional signups with referral code badges.

### 2. 📅 Campaign Planner & 7-Day Strategy
- **4 Marketing Channels Target Mix:**
  1. *College Ambassadors:* 200 registrations
  2. *WhatsApp Communities:* 150 registrations
  3. *Instagram Promotions:* 75 registrations
  4. *Email & Personal Referrals:* 75 registrations
  - *Validation:* Non-negative enforcement, real-time sum checking (must equal 500), and a 1-click "Auto-Reset to 500" helper.
- **7-Day Execution Roadmap:**
  - Day 1: Campaign Preparation & Tracking Setup
  - Day 2: Ambassador & WhatsApp Outreach Launch
  - Day 3: Instagram Paid Promotion & Social Proof
  - Day 4: College Outreach Expansion & Referrals (Active Simulated Day)
  - Day 5: Mid-Campaign Channel Performance Review
  - Day 6: Channel Prioritization & High-Urgency Reminders
  - Day 7: Final Campaign Push & Milestone Post-Mortem
  - *Interactive Checklist:* Check off daily tasks with instant `localStorage` persistence.

### 3. 👥 Registration Management
- **Search & Multi-Filters:** Real-time search by Student Name, Email, College, or Referral Code. Filter by Channel, Campaign Day (1–7), or Referral Code presence.
- **Add Registration Modal:**
  - Validates required fields and email format regex.
  - **Duplicate Email Prevention:** Automatically rejects attempts to register existing student emails.
  - Select college, branch (CSE/IT/AI-ML), channel, and optional ambassador referral code.
- **Safe Record Deletion:** Modal confirmation before deleting any record, triggering immediate metric and chart recalculations.
- **Data Export:** 1-click CSV export of all registration records.
- **Privacy Notice:** Transparently notes that this prototype stores data in `localStorage`, whereas production would require a secure backend compliant with Indian DPDP regulations.

### 4. 🏆 Ambassador & Referral Tracker
- **Dynamic Leaderboard:** Calculated directly by querying registration records matching each ambassador code (e.g., `CAMP101`, `CAMP102`, `CAMP103`, `CAMP104`, `CAMP105`).
- **Attribution Metrics:** Ranks, attributed signups count, target achievement %, and percentage contribution to overall campaign.
- **Add Ambassador:** Modal to register new campus leads with auto-generated unique codes.
- **1-Click Shareable Links:** Copy links formatted as `https://nxtwave.in/workshop?ref=CAMP101` with toast confirmation.

### 5. 📈 Channel Analytics
- **Actuals vs Target Chart:** Side-by-side bar chart visualizing each channel's performance against its goal.
- **Channel Share Donut:** Interactive percentage breakdown of total students acquired.
- **Daily Stacked Volume:** Daily contribution of each channel across Day 1 through Day 7.
- **Scorecard & Blended CAC:** Calculates acquisition cost per student per channel based on allocated expenditure.
- **Data-Driven Observations:** Real-time analysis of the leading channel and lagging channel based on live counts.

### 6. 💰 Budget Tracker
- **₹2,000 Allocation Tracking:**
  - *Instagram Promotion Test:* ₹800
  - *Promotional Content Expenses:* ₹300
  - *Ambassador Incentives:* ₹500
  - *Contingency Reserve:* ₹400
- **Dynamic Overspend Detection:** High-visibility alert banners if spending exceeds ₹2,000 or if burn rate surpasses 80%.
- **Itemized Expense Log:** Log, view, and delete expenses in INR (₹) with real-time balance updates.

### 7. 🤖 AI Growth Insights & Scenario Sandbox
- **Deterministic Rule-Based Engine:** Transparently labeled; computes diagnoses directly from live data without requiring third-party AI APIs or keys.
- **Strategic Analyses:**
  - *Top Performer Identification:* Details why College Ambassadors lead in volume.
  - *Bottleneck Diagnosis:* Highlights which channel has the highest registration deficit.
  - *Velocity & Pacing Forecast:* Evaluates whether the campaign will hit the 500 mark at the current pace.
  - *Budget Runway & CAC Analysis:* Assesses cost efficiency and recommends contingency fund reallocation.
- **Interactive "What-If" Sandbox:** Sliders to model the impact of boosting ambassador outreach, launching viral WhatsApp pushes, or reallocating contingency funds to ads.
- **Intern Daily Playbook:** Actionable daily punch-list aligned with the active campaign day.

### 8. 🔄 Demo Baseline & Simulation Controls
- **Day Selector Stepper:** Quickly simulate the state of the campaign from Day 1 to Day 7.
- **Reset to Baseline:** 1-click restoration of initial demo data (284 registrations, 5 ambassadors, initial expenses).

---

## 🛠️ Tech Stack & Architecture

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 8 (Ultra-fast build and instant HMR)
- **Styling:** Tailwind CSS (Custom NxtWave color scale, responsive design, dark/light contrast)
- **Icons:** Lucide React
- **Visualizations:** Recharts (Responsive bar charts, pie charts, and trend graphs)
- **State & Persistence:** React Context API with `localStorage` synchronization
- **Testing:** Comprehensive automated Node.js test suite (`npm test`)

---

## 💻 Local Setup & Execution Guide

### Prerequisites
- Node.js (v18 or higher recommended; v24 supported)
- npm (v9 or higher)

### Installation & Run Steps

1. **Clone or open the repository directory:**
   ```bash
   cd NxtWave-Growth-Tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at the URL shown in the terminal (usually `http://localhost:5173`).

4. **Run TypeScript Type-Checking:**
   ```bash
   npm run typecheck
   ```

5. **Run the Automated Verification Suite:**
   ```bash
   npm test
   ```
   *Runs 23 automated end-to-end tests covering data models, duplicate email validation, referral attribution, budget overspend alerts, and insights generation.*

6. **Build for Production:**
   ```bash
   npm run build
   ```

7. **Preview the Production Build Locally:**
   ```bash
   npm run preview
   ```
   Runs the compiled bundle on `http://localhost:4173`.

---

## 🌐 Deployment Instructions (Publishing for Reviewers)

### Option 1: Vercel (Recommended)
1. Push this repository to GitHub / GitLab.
2. Visit [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import the repository.
4. Framework Preset: **Vite** (Build Command: `npm run build`, Output Directory: `dist`).
5. Click **Deploy**. The application will be live with a shareable URL in under 60 seconds.

### Option 2: Netlify
1. Go to [netlify.com](https://netlify.com) and select **"Add new site" -> "Import an existing project"**.
2. Connect your Git provider.
3. Build command: `npm run build` | Publish directory: `dist`.
4. Click **Deploy Site**.

### Option 3: GitHub Pages
1. In `vite.config.ts`, set `base: '/<repository-name>/'`.
2. Add the `gh-pages` package: `npm install -D gh-pages`.
3. Add a deploy script to `package.json`: `"deploy": "npm run build && gh-pages -d dist"`.
4. Run `npm run deploy`.

---

## ⚠️ Known Limitations & Simulated Data Notes

1. **Simulated Data Disclaimer:** All 284 preloaded student records, emails, colleges, and referral tallies are realistic fictional representations designed for campaign modeling.
2. **Local Storage Scoping:** Data modifications (such as adding or deleting registrations or logging expenses) are stored in the client browser's `localStorage`. In a multi-user production deployment, a relational database (e.g., PostgreSQL with Prisma/Supabase) and authenticated API endpoints would replace local storage.
3. **Form Integration:** In a real workshop campaign, referral tracking is driven by UTM parameters query strings (`?ref=CAMP101`) collected through a live registration form and webhooks into an analytics pipeline.

---

*Engineered with precision for the NxtWave Growth Intern Challenge.*
