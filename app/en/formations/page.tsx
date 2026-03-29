import type { Metadata } from "next";
import FormationsClient from "../../formations/FormationsClient";
import { translations } from "../../../lib/translations";

export const metadata: Metadata = {
  title: "Photo & Video Training",
  description: "Hands-on photography and video training in Brussels with Bmk Studio. Learn to master your camera, light and editing. Small groups, practical, real results.",
  keywords: ["photography training Brussels", "photo course Brussels", "video workshop Brussels", "learn product photography", "light mastery course", "Belgium photography workshop"]
};

export default function EnFormationsPage() {
  return <FormationsClient t={translations.en} basePath="/en" />;
}
