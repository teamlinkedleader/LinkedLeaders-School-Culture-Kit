import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { SectionNav } from '@/components/SectionNav';
import { Principles } from '@/components/Principles';
import { ActivityGrid } from '@/components/ActivityGrid';
import { FeaturedPreview } from '@/components/FeaturedPreview';
import { ActivityCorner } from '@/components/ActivityCorner';
import { ScavengerHunt } from '@/components/ScavengerHunt';
import { SelfAssessment } from '@/components/SelfAssessment';
import { UnlockModal } from '@/components/UnlockModal';
import { CoachingOffer } from '@/components/CoachingOffer';
import { MentorOfferModal } from '@/components/MentorOfferModal';
import { Footer } from '@/components/Footer';
import type { CultureActivity } from '@/data/activities';
import { activities } from '@/data/activities';
import { loadAccess, saveAccess, checkFullAccess, canRead, type AccessState } from '@/lib/access';

/** Remembers that the mentor offer has been shown, so it only ever appears once. */
const MENTOR_OFFER_SEEN = 'll-mentor-offer-seen-v1';

function App() {
  const [access, setAccess] = useState<AccessState>(loadAccess);
  const [modalOpen, setModalOpen] = useState(false);
  const [mentorOfferOpen, setMentorOfferOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<CultureActivity | null>(null);

  const featuredActivity = activities.find((a) => a.code === 'CB-53') ?? activities[0];

  // A returning visitor may have paid on another device or since their last
  // visit, so re-check with the server rather than trusting local state alone.
  useEffect(() => {
    if (!access.email || access.tier === 'full') return;
    let cancelled = false;
    checkFullAccess(access.email).then((paid) => {
      if (paid && !cancelled) {
        setAccess((prev) => {
          const next = { ...prev, tier: 'full' as const };
          saveAccess(next);
          return next;
        });
      }
    });
    return () => { cancelled = true; };
  }, [access.email, access.tier]);

  const openClaim = () => setModalOpen(true);

  /**
   * Show the mentor offer once, after the visitor has unlocked the year and has
   * actually started reading.
   *
   * The trigger is scroll depth rather than a timer, because time on page does
   * not distinguish someone reading from someone who left a tab open. Firing it
   * before they have seen the material would be noise; the offer only makes
   * sense once they are facing the question of which activities to run.
   *
   * Once dismissed it never returns. A pop-up that reappears earns dismissals,
   * not bookings, and would sour the free thing it interrupts.
   */
  useEffect(() => {
    if (access.tier === 'visitor') return;
    if (localStorage.getItem(MENTOR_OFFER_SEEN) === '1') return;

    const onScroll = () => {
      const grid = document.getElementById('activities');
      if (!grid) return;
      // A viewport and a half past the top of the grid: they have scrolled
      // through roughly the first two months. Deliberately not a fraction of
      // the grid's height, which with 83 cards would be several thousand
      // pixels down and effectively never reached.
      const trigger = grid.offsetTop + window.innerHeight * 1.5;
      if (window.scrollY >= trigger) {
        setMentorOfferOpen(true);
        localStorage.setItem(MENTOR_OFFER_SEEN, '1');
        window.removeEventListener('scroll', onScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [access.tier]);

  const handleClaimed = (name: string, email: string) => {
    const next: AccessState = { tier: 'pack', email, name, packKey: null };
    setAccess(next);
    saveAccess(next);
    setTimeout(() => {
      document.getElementById('activities')?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onClaimClick={() => openClaim()} access={access} />
      <main>
        <Hero onClaimClick={openClaim} access={access} />
        <SectionNav />
        <Principles />
        <FeaturedPreview
          activity={featuredActivity}
          onOpen={() => setSelectedActivity(featuredActivity)}
          onSubscribeClick={openClaim}
        />
        <ActivityGrid
          access={access}
          onClaimClick={openClaim}
          onActivityClick={(a) => setSelectedActivity(a)}
        />
        <CoachingOffer access={access} />
        <SelfAssessment />
        <ScavengerHunt />
      </main>
      <Footer />
      <ActivityCorner
        activity={selectedActivity}
        readable={canRead(access)}
        onClose={() => setSelectedActivity(null)}
        onClaimClick={() => { setSelectedActivity(null); openClaim(); }}
      />
      <MentorOfferModal
        open={mentorOfferOpen}
        name={access.name}
        onClose={() => setMentorOfferOpen(false)}
      />
      <UnlockModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleClaimed}
      />
    </div>
  );
}

export default App;
