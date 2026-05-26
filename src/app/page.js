import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/home/Hero'
import TrustedBy from '@/components/home/TrustedBy'
    {/*}import Mission from '@/components/home/Mission' >*/}
import LegacyImpactSection from "@/components/home/LegacyImpactSection";
import Projects from '@/components/home/Projects'
import Community from '@/components/home/Community'
import MarqueeLines from '@/components/home/MarqueeLines'
import Messages from '@/components/home/Messages'
    {/*} import DonationForm from '@/components/home/DonationForm' >*/}
import PeopleImpact from '@/components/home/PeopleImpact'
import NewsEvents from '@/components/home/NewsEvents'
import Publications from '@/components/home/Publications'
import Newsletter from '@/components/home/Newsletter'
import FAQ from '@/components/home/FAQ'
import DonationForm from "@/components/shared/DonationForm";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustedBy />
    {/*}  <Mission />*/}
<LegacyImpactSection />
      <Projects />
      <Community />
      <MarqueeLines />
      <Messages />
       <DonationForm showTitle={false} compact={true} />
     {/*}   <DonationForm /> >*/}
      <PeopleImpact />
      <NewsEvents />
     {/*}    <Publications />  >*/}
      <Newsletter />
      <FAQ />
      <Footer />
    </main>
  )
}