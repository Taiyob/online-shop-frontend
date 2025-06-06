import DebugComponent from "@/components/DebugComponent";
import LeftSideBar from "@/components/shared/LeftSideBar";

export const metadata = {
  title: "Next Auth Dashboard",
  description: "Generated by create next app",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen my-2">
      <DebugComponent name="DashboardLayout" />
      <div className="flex justify-between">
        <div className="w-[20%]">{<LeftSideBar></LeftSideBar>}</div>
        <div className="w-[80%] bg-base-200 rounded-box ml-2">{children}</div>
      </div>
    </div>
  );
}

/*
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>{children}</body>
    </html>
  );
}

*/
