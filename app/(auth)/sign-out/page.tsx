"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/actions/auth.action";

const SignOutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await signOut();
        // Redirect to home page after signing out
        router.push("/");
      } catch (error) {
        console.error("Error signing out:", error);
        // Still redirect to home even if there's an error
        router.push("/");
      }
    };

    handleSignOut();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Signing out...</h2>
        <p className="text-gray-400">Please wait while we sign you out.</p>
      </div>
    </div>
  );
};

export default SignOutPage;
