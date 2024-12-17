import { getCurrentSession } from "@/lib/server/lucia";
import ThemeSelect from "../_components/client/ThemeSelect";

export default async function Home() {
  const { user } = await getCurrentSession();

  return (
    <div>
      <ThemeSelect />
    </div>
  );
}
