import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser, signOut } from "@/lib/actions/auth.action";
import { Button } from "@/components/ui/button";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();
  
  return (
    <div className="root-layout">
      <nav className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="MockMate Logo" width={38} height={32} />
          <h2 className="text-primary-100">PrepWise</h2>
        </Link>
        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-primary-100">Welcome, {user.name}!</span>
              <form action={async () => {
                "use server";
                await signOut();
                redirect("/");
              }}>
                <Button type="submit" variant="outline" size="sm">
                  Sign Out
                </Button>
              </form>
            </div>
          ) : (
            <Button asChild className="btn-primary">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </nav>

      {children}
    </div>
  );
};

export default RootLayout;