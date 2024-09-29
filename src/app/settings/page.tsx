import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Settings from "@/components/Settings";
import { AppProvider } from "@/context/AppContext";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <AppProvider>
      <Settings />
    </AppProvider>
  );
}
