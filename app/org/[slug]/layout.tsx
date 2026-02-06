import { OrgHeader } from "@/components/org/OrgHeader";
import OrgProvider from "@/components/org/OrgProvider";
import { OrgSidebar } from "@/components/org/OrgSidebar";

export default async function OrgAdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <OrgProvider slug={slug}>
      <div className="flex min-h-screen bg-org-bg">
        <OrgSidebar slug={slug} />

        <div className="flex-1 flex flex-col lg:pl-72 transition-all duration-300">
          <OrgHeader />
          <main className="flex-1 p-6 lg:p-10 max-w-6xl mx-auto w-full">
            {children}
          </main>
        </div>
      </div>
    </OrgProvider>
  );
}
