import Background from "@/components/Background";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getVehicles, getGarageStats, getSessionUser } from "@/db/queries";
import { GarageDashboardClient } from "@/components/GarageDashboardClient";
import { getCarImageUrl } from "@/lib/wikipedia-image";

export const dynamic = "force-dynamic";

export default async function GaragePage() {
  const user = await getSessionUser();
  const [fetchedVehicles, fetchedStats] = await Promise.all([
    getVehicles(user.id),
    getGarageStats(user.id),
  ]);

  const vehicles = await Promise.all(
    fetchedVehicles.map(async (v) => {
      const carExpenses = v.serviceRecords?.reduce((sum, s) => sum + parseFloat(s.totalAmount), 0) || 0;

      let imageUrl = v.imageUrl || undefined;
      if (!imageUrl) {
        try {
          imageUrl = (await getCarImageUrl(v.make, v.model)) || undefined;
        } catch (wikiError) {
          console.error("Failed to auto-fetch Wikipedia image for dashboard list:", wikiError);
        }
      }

      return {
        id: v.id,
        make: v.make,
        model: v.model,
        year: v.year || new Date().getFullYear(),
        licensePlate: v.plateNumber || "",
        mileage: v.currentMileage || 0,
        health: 95, // default health status placeholder
        imageUrl,
        insuranceExpiry: v.insuranceExpiry || undefined,
        carExpenses,
      };
    })
  );

  return (
    <>
      <Background />
      <Header showAccountIcon={true} garageContext={vehicles} forceScrolled={true} />
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
