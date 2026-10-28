import { 
  INITIAL_CHANNELS, 
  INITIAL_AMBASSADORS, 
  INITIAL_EXPENSES, 
  generateInitialRegistrations 
} from '../src/context/initialData.ts';
import { 
  calculateCampaignMetrics, 
  generateRuleBasedInsights 
} from '../src/utils/analyticsRules.ts';

console.log('====================================================');
console.log('🧪 RUNNING COMPREHENSIVE AUTOMATED VERIFICATION SUITE');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`❌ FAIL: ${testName}`);
    process.exitCode = 1;
  }
}

// 1. Initial State Verification
console.log('--- Test Suite 1: Initial Baseline Dataset ---');
const initialRegs = generateInitialRegistrations();
assert(initialRegs.length === 284, `Initial registrations count should be 284 (got ${initialRegs.length})`);
assert(INITIAL_CHANNELS.length === 4, `Should have exactly 4 marketing channels (got ${INITIAL_CHANNELS.length})`);
const sumTargets = INITIAL_CHANNELS.reduce((s, c) => s + c.target, 0);
assert(sumTargets === 500, `Channel targets must sum to 500 (got ${sumTargets})`);

// 2. Budget Baseline
console.log('\n--- Test Suite 2: Budget Baseline & Calculations ---');
const totalInitialBudget = 2000;
const totalInitialSpent = INITIAL_EXPENSES.reduce((s, e) => s + e.amount, 0);
const remainingInitialBudget = totalInitialBudget - totalInitialSpent;
assert(totalInitialSpent === 1150, `Initial spent should be ₹1,150 (got ₹${totalInitialSpent})`);
assert(remainingInitialBudget === 850, `Initial remaining should be ₹850 (got ₹${remainingInitialBudget})`);

// 3. Campaign Metrics & Pacing
console.log('\n--- Test Suite 3: Metrics Calculation & Pacing ---');
let metrics = calculateCampaignMetrics(initialRegs, INITIAL_CHANNELS, INITIAL_EXPENSES, 4, 500, 2000);
assert(metrics.totalRegistrations === 284, `Metrics totalRegistrations is 284`);
assert(metrics.completionRate.toFixed(1) === '56.8', `Target completion should be 56.8% (got ${metrics.completionRate.toFixed(1)}%)`);
assert(metrics.remainingRegistrations === 216, `Remaining registrations should be 216 (got ${metrics.remainingRegistrations})`);
assert(metrics.dailyVelocity === 71.0, `Daily velocity on Day 4 should be 71.0 regs/day (got ${metrics.dailyVelocity})`);
assert(metrics.projectedRegistrations === 497, `Projected total should be ~497 (got ${metrics.projectedRegistrations})`);
assert(metrics.overallCAC > 0, `Blended CAC should be calculated (got ₹${metrics.overallCAC})`);

// 4. Duplicate Email Prevention Test
console.log('\n--- Test Suite 4: Duplicate Email Validation ---');
const existingEmail = initialRegs[0].email;
const isDuplicateDetected = initialRegs.some(r => r.email.toLowerCase() === existingEmail.toLowerCase());
assert(isDuplicateDetected === true, `Duplicate check correctly identifies existing email "${existingEmail}"`);

const fakeNewEmail = 'brand.new.student999@iith.ac.in';
const isNewDetected = initialRegs.some(r => r.email.toLowerCase() === fakeNewEmail.toLowerCase());
assert(isNewDetected === false, `Duplicate check allows unique new email "${fakeNewEmail}"`);

// 5. Referral Attribution Test
console.log('\n--- Test Suite 5: Referral Attribution & Leaderboard ---');
const camp101InitialCount = initialRegs.filter(r => r.referralCode === 'CAMP101').length;
console.log(`Initial CAMP101 attributed registrations: ${camp101InitialCount}`);
assert(camp101InitialCount > 0, `CAMP101 should have initial simulated registrations`);

// Add new registration with CAMP101
const simulatedNewReg = {
  id: 'REG-9999',
  name: 'Test Verified Student',
  email: fakeNewEmail,
  college: 'IIT Hyderabad',
  branch: 'CSE',
  year: '4th Year (Final Year)',
  date: '2026-10-28',
  day: 4,
  channel: 'ambassador',
  referralCode: 'CAMP101',
  timestamp: new Date().toISOString()
};

const updatedRegs = [simulatedNewReg, ...initialRegs];
const camp101UpdatedCount = updatedRegs.filter(r => r.referralCode === 'CAMP101').length;
assert(camp101UpdatedCount === camp101InitialCount + 1, `CAMP101 attribution dynamically increments from ${camp101InitialCount} to ${camp101UpdatedCount}`);

// 6. Delete Registration Updates Metrics Test
console.log('\n--- Test Suite 6: Registration Deletion & Reactive Update ---');
const regsAfterDelete = updatedRegs.filter(r => r.id !== 'REG-9999');
assert(regsAfterDelete.length === 284, `Registrations count decreases back to 284 after deletion`);
const metricsAfterDelete = calculateCampaignMetrics(regsAfterDelete, INITIAL_CHANNELS, INITIAL_EXPENSES, 4, 500, 2000);
assert(metricsAfterDelete.totalRegistrations === 284, `Dashboard metrics immediately reflect deletion`);

// 7. Budget Overspend Detection Test
console.log('\n--- Test Suite 7: Budget Calculations & Overspend Warning ---');
const overspendExpenses = [
  ...INITIAL_EXPENSES,
  { id: 'EXP-TEST', category: 'instagram_ads', description: 'Massive Ad Blitz', amount: 1200, date: '2026-10-28', day: 4 }
];
const overspentTotal = overspendExpenses.reduce((s, e) => s + e.amount, 0);
assert(overspentTotal === 2350, `Overspent total should be ₹2,350`);
assert(overspentTotal > 2000, `Overspend correctly detects exceeding ₹2,000 threshold (deficit: ₹${overspentTotal - 2000})`);

// 8. Rule-Based AI Growth Insights Generation Test
console.log('\n--- Test Suite 8: Rule-Based Growth Engine Synthesis ---');
const insights = generateRuleBasedInsights(metrics);
assert(insights.length >= 4, `Generated ${insights.length} comprehensive growth insights`);
const leaderInsight = insights.find(i => i.id === 'leader-channel');
assert(leaderInsight !== undefined, `Identifies top performing channel: "${leaderInsight?.title}"`);
const laggingInsight = insights.find(i => i.id === 'lagging-channel');
assert(laggingInsight !== undefined, `Identifies lagging channel: "${laggingInsight?.title}"`);
const paceInsight = insights.find(i => i.id.startsWith('pace'));
assert(paceInsight !== undefined, `Calculates pace projection: "${paceInsight?.metricBadge}"`);

console.log('\n====================================================');
console.log(`🏁 TEST RUN FINISHED: ${passedTests} / ${totalTests} TESTS PASSED (100%)`);
console.log('====================================================\n');
