import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Principles } from '@/components/Principles';
import { ActivityGrid } from '@/components/ActivityGrid';
import { FeaturedPreview } from '@/components/FeaturedPreview';
import { ActivityCorner } from '@/components/ActivityCorner';
import { ScavengerHunt } from '@/components/ScavengerHunt';
import { SubscribeModal } from '@/components/SubscribeModal';
import { Footer } from '@/components/Footer';
import type { CultureActivity } from '@/data/activities';
import { activities } from '@/data/activities';

function App() {
  const [subscribed, setSubscribed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<CultureActivity | null>(null);

  const handleSubscribeClick = () => setModalOpen(true);
  const featuredActivity = activities.find((a) => a.code === 'CB-53') ?? activities[0];

  const handleSubscribeSuccess = () => {
    setSubscribed(true);
    setTimeout(() => {
      document.getElementById('activities')?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onSubscribeClick={handleSubscribeClick} isSubscribed={subscribed} />
      <main>
        <Hero onSubscribeClick={handleSubscribeClick} isSubscribed={subscribed} />
        <Principles />
        <FeaturedPreview
          activity={featuredActivity}
          onOpen={() => setSelectedActivity(featuredActivity)}
          onSubscribeClick={handleSubscribeClick}
        />

        <ActivityGrid
          unlocked={subscribed}
          onSubscribeClick={handleSubscribeClick}
          onActivityClick={(a) => setSelectedActivity(a)}
        />
        <ScavengerHunt />
      </main>
      <Footer />
      <ActivityCorner
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
      />
      <SubscribeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSubscribeSuccess}
      />
    </div>
  );
}

export default App;
