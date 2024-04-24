import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";

export default async function IndexPage() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          {/* <MainNav items={landingPageConfig.mainNav} /> */}
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "link" }))}
          >
            Sign In
          </Link>
        </div>
      </header>
      <section className="grid-background space-y-4 py-6 md:py-16 lg:py-36">
        <div className="container flex max-w-[64rem] flex-col gap-4">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Your{" "}
            <span className="rounded-xl bg-foreground px-2 py-0 text-center text-background">
              SaSS
            </span>{" "}
            template
          </h1>
          <p className="leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Built with{" "}
            <a href="" className="font-medium underline underline-offset-4">
              nextjs
            </a>{" "}
            and bla bla bla
          </p>
          <div className="space-x-4">
            <Link
              href="#pricing"
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
            >
              Pricing
            </Link>
            <Link
              href="/register"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
