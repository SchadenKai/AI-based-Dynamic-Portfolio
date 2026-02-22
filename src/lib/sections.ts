import { Profile } from '@/types/profile';
import { SectionName } from '@/store/useLayoutStore';

/**
 * Determines which sections of the portfolio should be visible based on the provided profile data
 * and environment variables.
 */
export function getAvailableSections(profile: Profile): SectionName[] {
    const available: SectionName[] = ['about']; // About is always available

    if (profile.skills && profile.skills.length > 0) {
        available.push('skills');
    }

    if (profile.work && profile.work.length > 0) {
        available.push('experience');
    }

    if (profile.projects && profile.projects.length > 0) {
        available.push('projects');
    }

    if (profile.achievements && profile.achievements.length > 0) {
        available.push('achievements');
    }

    // Writings are available if there are tiktok links OR if DEV_TO_API_KEY is set in environment
    const hasTiktok = profile.tiktok && profile.tiktok.length > 0;
    const hasDevTo = !!process.env.DEV_TO_API_KEY;

    if (hasTiktok || hasDevTo) {
        available.push('writings');
    }

    return available;
}
