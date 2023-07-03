import "../styles/globals.css";
import { Metadata } from "next";
import { AuthContextProvider } from "./providers/authProvider";

export const metadata: Metadata = {
  title: "IntelliHire - AI-Powered Mock Interviews",
  openGraph: {
    title: "IntelliHire - AI-Powered Mock Interviews",
    description:
      "IntelliHire is an AI-powered mock interview platform that helps you practice for your next job interview.",
    // images: [
    //   {
    //     url: "https://demo.useliftoff.com/opengraph-image",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IntelliHire - AI-Powered Mock Interviews",
    description:
      "IntelliHire is an AI-powered mock interview platform that helps you practice for your next job interview.",
    // images: ["https://demo.useliftoff.com/opengraph-image"],
    creator: "@KolyaSotnichenko",
  },
  // metadataBase: new URL("https://demo.useliftoff.com"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="scroll-smooth antialiased [font-feature-settings:'ss01']">
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
