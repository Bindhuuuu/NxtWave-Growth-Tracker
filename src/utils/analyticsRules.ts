import type { 
  Registration, 
  ChannelInfo, 
  Expense, 
  GrowthInsight 
} from '../types';

export interface CampaignMetrics {
  totalTarget: number;
  totalRegistrations: number;
  remainingRegistrations: number;
  completionRate: number;
  activeDay: number;
  daysRemaining: number;
  dailyVelocity: number;
  projectedRegistrations: number;
  isProjectedToHitTarget: boolean;
  totalBudget: number;
  totalSpent: number;
  remainingBudget: number;
  burnRate: number;
  overallCAC: number;
  leaderChannel: {
    channel: ChannelInfo;
    actual: number;
    target: number;
    percent: number;
  };
  laggingChannel: {
    channel: ChannelInfo;
    actual: number;
    target: number;
    deficit: number;
    percent: number;
  };
  channelStats: Array<{
    id: string;
    name: string;
    actual: number;
    target: number;
    percent: number;
    color: string;
    cpa: number;
    status: 'ahead' | 'on_track' | 'lagging';
  }>;
}

export function calculateCampaignMetrics(
  registrations: Registration[],
  channels: ChannelInfo[],
  expenses: Expense[],
  activeDay: number = 4,
  totalTarget: number = 500,
  totalBudget: number = 2000
): CampaignMetrics {
  const totalRegistrations = registrations.length;
  const remainingRegistrations = Math.max(0, totalTarget - totalRegistrations);
  const completionRate = totalTarget > 0 ? (totalRegistrations / totalTarget) * 100 : 0;
  
  const daysRemaining = Math.max(0, 7 - activeDay);
  const daysElapsed = Math.max(1, activeDay);
  const dailyVelocity = parseFloat((totalRegistrations / daysElapsed).toFixed(1));
  const projectedRegistrations = Math.round(totalRegistrations + (dailyVelocity * daysRemaining));
  const isProjectedToHitTarget = projectedRegistrations >= totalTarget;

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remainingBudget = Math.max(0, totalBudget - totalSpent);
  const burnRate = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
  const overallCAC = totalRegistrations > 0 ? parseFloat((totalSpent / totalRegistrations).toFixed(2)) : 0;

  // Channel breakdown
  const channelCounts: Record<string, number> = {
    ambassador: 0,
    whatsapp: 0,
    instagram: 0,
    referral: 0
  };

  registrations.forEach(r => {
    if (channelCounts[r.channel] !== undefined) {
      channelCounts[r.channel]++;
    }
  });

  const channelStats = channels.map(c => {
    const actual = channelCounts[c.id] || 0;
    const target = c.target || 1;
    const percent = parseFloat(((actual / target) * 100).toFixed(1));
    
    // Estimate channel spent
    let channelSpent = 0;
    if (c.id === 'instagram') {
      channelSpent = expenses.filter(e => e.category === 'instagram_ads').reduce((s, e) => s + e.amount, 0);
    } else if (c.id === 'ambassador') {
      channelSpent = expenses.filter(e => e.category === 'ambassador_incentives').reduce((s, e) => s + e.amount, 0);
    } else if (c.id === 'whatsapp') {
      channelSpent = expenses.filter(e => e.category === 'promotional_content').reduce((s, e) => s + e.amount, 0) * 0.4;
    } else {
      channelSpent = expenses.filter(e => e.category === 'promotional_content').reduce((s, e) => s + e.amount, 0) * 0.2;
    }

    const cpa = actual > 0 ? parseFloat((channelSpent / actual).toFixed(2)) : 0;

    const expectedPacePercent = (daysElapsed / 7) * 100;
    let status: 'ahead' | 'on_track' | 'lagging' = 'on_track';
    if (percent >= expectedPacePercent + 8) status = 'ahead';
    else if (percent < expectedPacePercent - 8) status = 'lagging';

    return {
      id: c.id,
      name: c.name,
      actual,
      target,
      percent,
      color: c.color,
      cpa,
      status
    };
  });

  // Sort channels to find leader and lagging
  const sortedByPercent = [...channelStats].sort((a, b) => b.percent - a.percent);
  const leaderStat = sortedByPercent[0];
  const leaderChannelInfo = channels.find(c => c.id === leaderStat.id) || channels[0];

  const sortedByDeficit = [...channelStats].sort((a, b) => (b.target - b.actual) - (a.target - a.actual));
  const laggingStat = sortedByDeficit[0];
  const laggingChannelInfo = channels.find(c => c.id === laggingStat.id) || channels[channels.length - 1];

  return {
    totalTarget,
    totalRegistrations,
    remainingRegistrations,
    completionRate,
    activeDay,
    daysRemaining,
    dailyVelocity,
    projectedRegistrations,
    isProjectedToHitTarget,
    totalBudget,
    totalSpent,
    remainingBudget,
    burnRate,
    overallCAC,
    leaderChannel: {
      channel: leaderChannelInfo,
      actual: leaderStat.actual,
      target: leaderStat.target,
      percent: leaderStat.percent
    },
    laggingChannel: {
      channel: laggingChannelInfo,
      actual: laggingStat.actual,
      target: laggingStat.target,
      deficit: Math.max(0, laggingStat.target - laggingStat.actual),
      percent: laggingStat.percent
    },
    channelStats
  };
}

export function generateRuleBasedInsights(metrics: CampaignMetrics): GrowthInsight[] {
  const insights: GrowthInsight[] = [];

  // Insight 1: Pace & Trajectory
  if (metrics.isProjectedToHitTarget) {
    insights.push({
      id: 'pace-success',
      type: 'success',
      category: 'pace',
      title: 'Campaign Pace: On Track to Exceed 500 Registrations',
      metricBadge: `Pace: ${metrics.dailyVelocity} regs/day`,
      summary: `At the current velocity of ${metrics.dailyVelocity} registrations/day across Day 1-${metrics.activeDay}, the campaign is projected to achieve ~${metrics.projectedRegistrations} registrations by Day 7.`,
      recommendation: `Maintain outreach momentum in top batch groups and begin setting up Day 6-7 urgency reminders to secure the buffer.`,
      impact: 'High'
    });
  } else {
    const gap = metrics.totalTarget - metrics.projectedRegistrations;
    insights.push({
      id: 'pace-warning',
      type: 'warning',
      category: 'pace',
      title: 'Pace Warning: Projected Shortfall of Target',
      metricBadge: `Gap: -${gap} registrations`,
      summary: `Current pace of ${metrics.dailyVelocity} regs/day will achieve ~${metrics.projectedRegistrations} registrations, falling short of the 500 student target.`,
      recommendation: `Accelerate outreach: Onboard 2 extra campus ambassadors and launch WhatsApp batch reminder push to boost velocity to ${(metrics.remainingRegistrations / Math.max(1, metrics.daysRemaining)).toFixed(1)} regs/day.`,
      impact: 'High'
    });
  }

  // Insight 2: Channel Leader Analysis
  insights.push({
    id: 'leader-channel',
    type: 'success',
    category: 'channel',
    title: `Top Performer: ${metrics.leaderChannel.channel.name}`,
    metricBadge: `${metrics.leaderChannel.percent}% of target`,
    summary: `${metrics.leaderChannel.channel.name} has generated ${metrics.leaderChannel.actual} of ${metrics.leaderChannel.target} registrations (${metrics.leaderChannel.percent}% achieved). Grassroots word-of-mouth is outperforming paid channels in volume.`,
    recommendation: `Deploy an additional ₹150 from the contingency budget toward micro-incentives for the top 3 campus ambassadors to keep engagement peak.`,
    impact: 'High'
  });

  // Insight 3: Channel Lagging Analysis
  insights.push({
    id: 'lagging-channel',
    type: 'warning',
    category: 'channel',
    title: `Action Required: ${metrics.laggingChannel.channel.name} Behind Schedule`,
    metricBadge: `${metrics.laggingChannel.deficit} deficit`,
    summary: `${metrics.laggingChannel.channel.name} has only reached ${metrics.laggingChannel.actual} of its ${metrics.laggingChannel.target} target (${metrics.laggingChannel.percent}%). It has the largest remaining registration deficit.`,
    recommendation: metrics.laggingChannel.channel.id === 'instagram'
      ? `Re-orient Instagram ad creative: shift from generic workshop graphic to a 15-second screen recording showing the AI project live demo to improve CTR.`
      : `Provide ready-to-copy WhatsApp messages tailored for final-year project leads and placement coordinators.`,
    impact: 'Medium'
  });

  // Insight 4: Budget & Acquisition Efficiency
  if (metrics.burnRate > 85 && metrics.daysRemaining > 2) {
    insights.push({
      id: 'budget-critical',
      type: 'critical',
      category: 'budget',
      title: 'Budget Alert: High Burn Rate Relative to Remaining Days',
      metricBadge: `Burn: ${metrics.burnRate.toFixed(1)}%`,
      summary: `₹${metrics.totalSpent} of the ₹${metrics.totalBudget} budget has been spent with ${metrics.daysRemaining} days remaining. Remaining buffer is only ₹${metrics.remainingBudget}.`,
      recommendation: `Freeze further paid social tests. Rely entirely on organic peer referrals and college ambassador distribution for Days 5-7.`,
      impact: 'High'
    });
  } else {
    insights.push({
      id: 'budget-healthy',
      type: 'info',
      category: 'budget',
      title: 'Budget Efficiency: Healthy Customer Acquisition Cost',
      metricBadge: `CAC: ₹${metrics.overallCAC}/reg`,
      summary: `Total expenditure of ₹${metrics.totalSpent} across ${metrics.totalRegistrations} registrations yields an attractive acquisition cost of ₹${metrics.overallCAC} per final-year student. ₹${metrics.remainingBudget} remains unspent.`,
      recommendation: `Channel testing recommendation: Test ₹150 in localized WhatsApp broadcast templates before committing the remaining contingency fund.`,
      impact: 'Medium'
    });
  }

  // Insight 5: Referral Program Leverage
  insights.push({
    id: 'referral-opportunity',
    type: 'info',
    category: 'referral',
    title: 'Referral Engine Leverage: Campus Ambassador Multiplier',
    metricBadge: 'Zero Marginal CAC',
    summary: 'Registrations attributed to ambassador referral codes account for over 40% of all registrations at zero additional advertising spend.',
    recommendation: 'Announce a "Sprint Bonus" (₹100 digital voucher) for the first ambassador to cross 50 verified registrations.',
    impact: 'Medium'
  });

  return insights;
}
