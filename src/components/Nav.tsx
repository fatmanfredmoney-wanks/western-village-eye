import { getVolumes } from "@/lib/sanity";
import Header from "@/components/Header";

export default async function Nav() {
  let volumes: any[] = [];
  try {
    volumes = await getVolumes();
  } catch {
    // fail silently — header still renders without dropdown data
  }
  return <Header volumes={volumes} />;
}
