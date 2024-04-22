import { MainNav } from "@/components/main-nav";
import { UserAccountNav } from "@/components/user-account-nav";
import { dashboardConfig } from "@/config/dashboard";
import { auth } from "@/lib/auth";
import { ModeToggle } from "@/providers/mode-toggle";
import { redirect } from "next/navigation";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) return redirect("/register");
  if (!session.user) return redirect("/register");
  const user = session.user;
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <div className="flex items-center gap-4">
            <UserAccountNav
              user={{
                name: user.name,
                image: user.image,
                email: user.email,
              }}
            />
            <ModeToggle />
          </div>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          {/* <DashboardNav items={dashboardConfig.sidebarNav} /> */}
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      {/* [TODO] <SiteFooter className="border-t" /> */}
    </div>
  );
}
