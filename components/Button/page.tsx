import { useRouter } from "next/router";
import { auth } from "@/app/firebaseConfig";
import { signOut } from "firebase/auth";
import { useState } from "react";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    setError("");

    try {
      await signOut(auth);
      document.cookie =
        "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; samesite=strict";
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-red-600 border border-gray-200 dark:border-gray-600 transition"
      disabled={loading}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
