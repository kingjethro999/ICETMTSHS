import { HeroSection } from "@/components/layout/HeroSection";
import { AccreditationSection } from "@/components/layout/AccreditationSection";
import { ConferenceOverview } from "@/components/layout/ConferenceOverview";
import AboutConference from "@/components/layout/AboutConference";
import { ImageGallery } from "@/components/layout/ImageGallery";
import CoreFocus from "@/components/layout/CoreFocus";
import Partners from "@/components/layout/Partners";
import RegistrationSection from "@/components/layout/RegistrationSection";
import { getHomepageContent } from "@/lib/actions/public";

export default async function Home() {
  const content = await getHomepageContent();

  return (
    <>
      <HeroSection data={content.hero} />
      <AccreditationSection />
      <ConferenceOverview />
      <AboutConference data={content.about} />
      <ImageGallery />
      <CoreFocus />
      <Partners />
      <RegistrationSection feesData={content.fees} />
    </>
  );
}
