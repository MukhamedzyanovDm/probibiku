import Background from "@/components/Background";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getVehicles, getGarageStats, getDemoUser } from "@/db/queries";
import { GarageDashboardClient } from "@/components/GarageDashboardClient";

export const dynamic = "force-dynamic";

export default async function GaragePage() {
  const user = await getDemoUser();
  const [fetchedVehicles, fetchedStats] = await Promise.all([
    getVehicles(user.id),
    getGarageStats(user.id),
  ]);

  const vehicles = fetchedVehicles.map((v) => {
    const carExpenses = v.serviceRecords?.reduce((sum, s) => sum + parseFloat(s.totalAmount), 0) || 0;

    return {
      id: v.id,
      make: v.make,
      model: v.model,
      year: v.year || new Date().getFullYear(),
      licensePlate: v.plateNumber || "",
      mileage: v.currentMileage || 0,
      health: 95, // default health status placeholder
      imageUrl: v.imageUrl || undefined,
      carExpenses,
    };
  });

  return (
    <>
      <Background />
      <Header showAccountIcon={true} />
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20 font-sans min-h-screen">
        <GarageDashboardClient
          cars={vehicles}
          stats={fetchedStats}
        />
      </main>
      <Footer />
    </>
  );
}
