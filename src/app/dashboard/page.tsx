import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import DashboardContent from "@/components/Dashboard";
import { AppProvider } from "@/context/AppContext";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}
