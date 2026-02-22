"use client";

import React from 'react';
import { Profile } from '@/types/profile';
import { GithubStats } from "@/components/content/GithubStats";
import { Github, Linkedin } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/client-constants';
import { useLayoutStore } from '@/store/useLayoutStore';

interface LeftColumnProps {
  profile: Profile;
}

export function LeftColumn({ profile }: LeftColumnProps) {
  const { layoutOrder } = useLayoutStore();

  // Filter out sections that shouldn't be in TOC if any (e.g. if we decide some are hidden)
  // For now, capitalize first letter
  const navItems = layoutOrder.map(section => ({
    id: section,
    label: section.charAt(0).toUpperCase() + section.slice(1)
  }));

  const githubUsername = profile.basics.profiles?.find(p => p.network === "GitHub")?.username || SITE_CONFIG.githubUsername;

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="lg:sticky lg:top-0 w-full p-6 md:p-12 flex flex-col gap-8 scrollbar-hide h-auto">

      {/* Header Info */}
      <header>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 uppercase tracking-tighter leading-[0.9] text-foreground text-balance">
          {profile.basics.name}
        </h1>
        <h2 className="text-xl sm:text-2xl text-primary font-black font-mono mb-6">
          {profile.basics.label}
        </h2>

        {/* Social Links */}
        <nav aria-label="Social links" className="flex flex-wrap gap-4 font-mono text-sm text-muted-foreground font-bold">
          {profile.basics.profiles?.map(p => (
            <a
              key={p.network}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary hover:underline decoration-2 underline-offset-4 transition-all flex items-center gap-2"
              aria-label={`Visit ${p.network} profile`}
            >
              {p.network === "GitHub" && <Github className="w-4 h-4" />}
              {p.network === "LinkedIn" && <Linkedin className="w-4 h-4" />}
              [{p.network}]
            </a>
          ))}
        </nav>
      </header>

      {/* Table of Contents */}
      <nav className="hidden lg:block">
        <ul className="flex flex-col gap-3 font-mono text-sm font-bold text-muted-foreground">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className="group flex items-center gap-3 hover:text-foreground transition-colors"
              >
                <span className="w-8 h-[2px] bg-border group-hover:bg-primary group-hover:w-12 transition-all duration-300" />
                <span className="uppercase tracking-widest text-xs group-hover:translate-x-1 transition-transform">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Github Stats - Compact Version */}
      <div className="w-full mt-auto pt-8">
        <GithubStats username={githubUsername} variant="minimal" />
      </div>

    </div>
  );
}
