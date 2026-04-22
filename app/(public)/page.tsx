import { HeroSection } from "@/components/layout/HeroSection";
import { ConferenceOverview } from "@/components/layout/ConferenceOverview";
import AboutConference from "@/components/layout/AboutConference";
import { ConferenceObjectives } from "@/components/layout/ConferenceObjectives";
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
      <ConferenceOverview />
      <AboutConference data={content.about} />
      <ConferenceObjectives />
      <ImageGallery />
      <CoreFocus />
      <Partners />
      <RegistrationSection feesData={content.fees} />
    </>
  );
}
