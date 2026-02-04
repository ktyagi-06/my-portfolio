import "./globals.css";
import ThemeProviderClient from "@/components/ThemeProviderClient";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "My Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProviderClient>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ThemeProviderClient>
      </body>
    </html>
  );
}
