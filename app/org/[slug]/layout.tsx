import { OrgHeader } from "@/components/org/OrgHeader";
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
    <div className="flex min-h-screen bg-bg-dark-0">
      <OrgSidebar slug={slug} />
      
      <div className="flex-1 flex flex-col lg:pl-72 transition-all duration-300">
        <OrgHeader />
        <main className="flex-1 p-6 lg:p-10 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
