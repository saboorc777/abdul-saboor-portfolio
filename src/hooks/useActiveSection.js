import { useEffect, useState } from 'react';

/**
 * Observes each section id and returns the one currently most in view,
 * used to drive the navbar's active-link indicator.
 */
export function useActiveSection(sectionIds = []) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');
  // Depend on the ids' content, not the array reference — callers that
  // pass a fresh array literal each render (easy to do by accident)
  // would otherwise tear down and recreate the observer on every render.
  const key = sectionIds.join('|');

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      // A thin horizontal "trigger line" near the top of the viewport,
      // rather than requiring 30% of a section's own height to be
      // visible. The old threshold-based approach missed short sections
      // (e.g. Work, Contact) that never reach 30% visible relative to
      // their own height — this only needs the line itself to cross the
      // section, so it works regardless of how tall or short it is.
      { threshold: 0, rootMargin: '-15% 0px -75% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return activeId;
}
