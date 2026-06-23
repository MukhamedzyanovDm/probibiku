import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, getDemoUser } from "@/db/queries";
import { db } from "@/db";
import { vehicles } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    
    const user = await getUserByEmail(email);
    
    // Check if logging in as Admin
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail && email.toLowerCase().trim() === adminEmail.toLowerCase().trim()) {
      const demoUser = await getDemoUser();
      if (demoUser && demoUser.id !== user.id) {
        // Transfer all vehicles from demo user to admin user
        await db.update(vehicles)
          .set({ userId: user.id })
          .where(eq(vehicles.userId, demoUser.id));
        console.log(`Transferred all vehicles from demo user (${demoUser.id}) to admin (${user.id})`);
      }
    }
    
    return NextResponse.json({ userId: user.id });
  } catch (error: any) {
    console.error("Login API error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
