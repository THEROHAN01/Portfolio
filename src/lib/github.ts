export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubData {
  contributions: ContributionDay[];
  totalContributions: number;
  topLanguages: { name: string; percentage: number; color: string }[];
}

// Generate realistic placeholder data
export function generatePlaceholderGitHubData(): GitHubData {
  const contributions: ContributionDay[] = [];
  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Simulate realistic activity patterns
    const rand = Math.random();
    let count = 0;
    if (isWeekend) {
      count = rand > 0.6 ? Math.floor(Math.random() * 5) : 0;
    } else {
      count = rand > 0.15 ? Math.floor(Math.random() * 12) + 1 : 0;
    }

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count > 0) level = 1;
    if (count > 3) level = 2;
    if (count > 6) level = 3;
    if (count > 9) level = 4;

    contributions.push({
      date: date.toISOString().split("T")[0],
      count,
      level,
    });
  }

  return {
    contributions,
    totalContributions: contributions.reduce((sum, d) => sum + d.count, 0),
    topLanguages: [
      { name: "Python", percentage: 42, color: "#3572A5" },
      { name: "TypeScript", percentage: 28, color: "#3178C6" },
      { name: "Go", percentage: 15, color: "#00ADD8" },
      { name: "Rust", percentage: 10, color: "#DEA584" },
      { name: "Other", percentage: 5, color: "#666666" },
    ],
  };
}
