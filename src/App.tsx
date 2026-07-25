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
import { ClaimPackModal } from '@/components/ClaimPackModal';
import { CoachingOffer } from '@/components/CoachingOffer';
import { Footer } from '@/components/Footer';
import type { CultureActivity } from '@/data/activities';
import { activities } from '@/data/activities';
import { loadAccess, saveAccess, checkFullAccess, canRead, type AccessState } from '@/lib/access';

function App() {
  const [access, setAccess] = useState<AccessState>(loadAccess);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingPackKey, setPendingPackKey] = useState<string | null>(null);
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

  const openClaim = (packKey?: string | null) => {
    setPendingPackKey(packKey ?? null);
    setModalOpen(true);
  };

  const handleClaimed = (name: string, email: string, packKey: string) => {
    const next: AccessState = { tier: 'pack', email, name, packKey };
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
        <Hero onClaimClick={() => openClaim()} access={access} />
        <SectionNav />
        <Principles />
        <FeaturedPreview
          activity={featuredActivity}
          onOpen={() => setSelectedActivity(featuredActivity)}
          onSubscribeClick={() => openClaim()}
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
        readable={selectedActivity ? canRead(access, selectedActivity.id) : false}
        onClose={() => setSelectedActivity(null)}
        onClaimClick={() => { setSelectedActivity(null); openClaim(); }}
      />
      <ClaimPackModal
        open={modalOpen}
        initialPackKey={pendingPackKey}
        onClose={() => setModalOpen(false)}
        onSuccess={handleClaimed}
      />
    </div>
  );
}

export default App;
