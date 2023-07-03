import "../../styles/globals.css";
import { Metadata } from "next";
import SideBar from "@/components/SideBar";

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

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <SideBar />
      {children}
    </main>
  );
}
