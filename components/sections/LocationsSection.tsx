import { LocationsSectionClient } from "@/components/sections/LocationsSectionClient";
import { locationsContent } from "@/data/landingContent";

export function LocationsSection() {
  return <LocationsSectionClient content={locationsContent} />;
}
