import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/home/Hero'
import TrustedBy from '@/components/home/TrustedBy'
    {/*}import Mission from '@/components/home/Mission' >*/}
import LegacyImpactSection from "@/components/home/LegacyImpactSection";
import Projects from '@/components/home/Projects'
import Community from '@/components/home/Community'
import MarqueeLines from '@/components/home/MarqueeLines'
 {/*} import Messages from '@/components/home/Messages'  {/*} 
    {/*} import DonationForm from '@/components/home/DonationForm' >*/}
    import Messages from "@/components/messages/Messages";
import PeopleImpact from '@/components/home/PeopleImpact'
import NewsEvents from '@/components/home/NewsEvents'
import WaysToDonate from '@/components/home/WaysToDonate'
import Publications from '@/components/home/Publications'
import Newsletter from '@/components/home/Newsletter'
import FAQ from '@/components/home/FAQ'
import DonationForm from "@/components/shared/DonationForm";
import FeaturedMessage from "@/components/home/FeaturedMessage";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
   
        <FeaturedMessage />
    {/*}  <Mission />*/}
<LegacyImpactSection />
      <Projects />
    
      {/*}   <Messages />  */}
      <Community />
      <MarqueeLines />
     
       <WaysToDonate />
       {/*}    <DonationForm showTitle={false} compact={true} /> */}
     {/*}   <DonationForm /> >*/}
      <PeopleImpact />
       
      <NewsEvents />
     {/*}    <Publications />  >*/}
      <Newsletter />
      
      <FAQ />
        <TrustedBy />
      <Footer />
    </main>
  )
}


