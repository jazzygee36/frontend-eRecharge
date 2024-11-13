'use client'
import Header from '@/component/header';
import WelcomeSection from '@/component/section';
import Cards from '@/component/card';
import Footer from '@/component/footer';
import { useEffect, useState } from 'react';
import Loading from '@/component/common/loading/loading';

export default function Home() {
  const [loading, setLoading] = useState(true); // Start with loading as true

  useEffect(() => {
    // Set loading to false after 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? <Loading /> : (
        <div>
          <div className="bg-[#61C9A8] w-full h-[54px]"></div>
          <Header />
          <WelcomeSection />
          <Cards />
          <Footer />
        </div>
      )}
    </div>
  );
}
