import Header from '@/component/header';
import WelcomeSection from '@/component/section';
import Cards from '@/component/card';
import Footer from '@/component/footer';

export default function Home() {
  return (
    <div>
      <div className={`bg-[#61C9A8] w-full h-[54px] `}></div>
      <Header />
      <WelcomeSection />
      <Cards />
      <Footer />
    </div>
  );
}
