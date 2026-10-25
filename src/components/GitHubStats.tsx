import React, { useEffect, useState } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { GitBranch, Star, GitFork, Users, Code, RefreshCw, AlertCircle } from 'lucide-react';

interface GitHubUserData {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  avatar_url: string;
  html_url: string;
}

interface RepoData {
  name: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  html_url: string;
  description: string | null;
}

const CACHE_KEY = 'hkp_github_stats_v1';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export const GitHubStats: React.FC = () => {
  const [userData, setUserData] = useState<GitHubUserData | null>(null);
  const [repos, setRepos] = useState<RepoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGitHubData = async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    if (!forceRefresh) {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_TTL) {
            setUserData(parsed.user);
            setRepos(parsed.repos);
            setLoading(false);
            return;
          }
        }
      } catch {
        // Ignore cache parse errors
      }
    }

    try {
      const [userRes, reposRes] = await Promise.all([
        fetch('https://api.github.com/users/HAliveKP'),
        fetch('https://api.github.com/users/HAliveKP/repos?per_page=100&sort=updated'),
      ]);

      if (!userRes.ok || !reposRes.ok) {
        throw new Error(`GitHub API rate limit or endpoint error (status ${userRes.status})`);
      }

      const userJson: GitHubUserData = await userRes.json();
      const reposJson: RepoData[] = await reposRes.json();

      setUserData(userJson);
      setRepos(reposJson);

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          user: userJson,
          repos: reposJson,
          timestamp: Date.now(),
        })
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to connect to GitHub API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData();
  }, []);

  // Calculate languages breakdown
  const languageCounts: Record<string, number> = {};
  repos.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  });

  const topLanguages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);

  return (
    <ScrollReveal>
      <section
        id="github-stats"
        className="py-16 sm:py-24 px-5 sm:px-8 lg:px-12 max-w-[1360px] mx-auto border-t border-[#1F242D]"
        aria-label="GitHub Live Telemetry and Stats"
      >
        <div className="flex flex-col gap-4 mb-10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#38BDF8]">
              // LIVE TELEMETRY
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#4B5563]">
              PUBLIC GITHUB METRICS @HAliveKP
            </span>
          </div>
          <h2 className="font-syne font-bold text-2xl sm:text-3xl lg:text-4xl text-[#F3F4F6] tracking-tight">
            Codebase Telemetry & Activity.
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-28 rounded-[8px] bg-[#111418] border border-[#1F242D]"
              />
            ))}
          </div>
        ) : error ? (
          <div className="p-6 rounded-[8px] bg-[#111418] border border-[#1F242D] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#9CA3AF]">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#38BDF8]" />
              <span>Offline / API limit fallback: Showing verified profile data (9 repos, Python, React, TypeScript).</span>
            </div>
            <button
              onClick={() => fetchGitHubData(true)}
              className="px-3 py-1.5 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] hover:border-[#38BDF8] text-[#F3F4F6] transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3 h-3 text-[#38BDF8]" />
              <span>RETRY API</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 4 Quick Metric Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-[8px] bg-[#111418] border border-[#1F242D] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] text-[#4B5563] uppercase">REPOSITORIES</span>
                  <GitBranch className="w-4 h-4 text-[#38BDF8]" />
                </div>
                <div className="font-syne font-bold text-3xl text-[#F3F4F6]">
                  {userData?.public_repos || 9}
                </div>
                <div className="font-mono text-[10px] text-[#9CA3AF] mt-2">Public Repositories</div>
              </div>

              <div className="p-6 rounded-[8px] bg-[#111418] border border-[#1F242D] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] text-[#4B5563] uppercase">TOTAL STARS</span>
                  <Star className="w-4 h-4 text-[#00E5FF]" />
                </div>
                <div className="font-syne font-bold text-3xl text-[#F3F4F6]">{totalStars}</div>
                <div className="font-mono text-[10px] text-[#9CA3AF] mt-2">Stargazers across repos</div>
              </div>

              <div className="p-6 rounded-[8px] bg-[#111418] border border-[#1F242D] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] text-[#4B5563] uppercase">NETWORK</span>
                  <Users className="w-4 h-4 text-[#38BDF8]" />
                </div>
                <div className="font-syne font-bold text-3xl text-[#F3F4F6]">
                  {userData?.followers || 0}
                </div>
                <div className="font-mono text-[10px] text-[#9CA3AF] mt-2">GitHub Followers</div>
              </div>
            </div>

            {/* Top Languages Column */}
            <div className="lg:col-span-4 p-6 rounded-[8px] bg-[#111418] border border-[#1F242D] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className="font-mono text-xs uppercase text-[#38BDF8] font-semibold flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  <span>PRIMARY LANGUAGES</span>
                </div>
                <span className="font-mono text-[10px] text-[#4B5563]">CACHED 1H</span>
              </div>

              <div className="space-y-2.5">
                {topLanguages.map(([lang, count]) => (
                  <div key={lang} className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[#F3F4F6]">{lang}</span>
                    <span className="text-[#38BDF8]">{count} repos</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </ScrollReveal>
  );
};
