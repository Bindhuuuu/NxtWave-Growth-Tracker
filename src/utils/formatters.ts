/**
 * Formatting utilities for currency, dates, numbers, and percentages
 */

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatPercent(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

export function exportRegistrationsToCSV(registrations: any[]): void {
  if (!registrations || registrations.length === 0) return;

  const headers = ['Registration ID', 'Student Name', 'Email', 'College', 'Branch', 'Year', 'Channel', 'Referral Code', 'Date', 'Day'];
  const rows = registrations.map(r => [
    r.id,
    `"${r.name.replace(/"/g, '""')}"`,
    `"${r.email}"`,
    `"${r.college.replace(/"/g, '""')}"`,
    `"${r.branch.replace(/"/g, '""')}"`,
    `"${r.year}"`,
    r.channel,
    r.referralCode || 'None',
    r.date,
    `Day ${r.day}`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `nxtwave_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
