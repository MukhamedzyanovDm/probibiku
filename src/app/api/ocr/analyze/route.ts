import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { key } = await req.json();

    if (!key) {
      return NextResponse.json({ error: "key is required" }, { status: 400 });
    }

    console.log(`⏳ Analyzing receipt: ${key}`);

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Mock structured data
    const mockData = {
      date: new Date().toISOString().split("T")[0],
      totalAmount: "12500.50",
      mileage: 45000,
      serviceCenterName: "ТехЦентр 'Пробибику'",
      items: [
        { description: "Замена масла в двигателе", cost: "5500.00", quantity: "1" },
        { description: "Фильтр масляный", cost: "1200.50", quantity: "1" },
        { description: "Диагностика подвески", cost: "5800.00", quantity: "1" },
      ],
    };

    return NextResponse.json({ data: mockData });
  } catch (error) {
    console.error("OCR Analysis error:", error);
    return NextResponse.json({ error: "Failed to analyze receipt" }, { status: 500 });
  }
}
