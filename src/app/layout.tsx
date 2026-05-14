import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Пробибику — Умный журнал обслуживания вашего автомобиля",
  description: "Автоматический учет расходов, сервисная книжка и история обслуживания в одном приложении.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
