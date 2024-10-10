import { useState } from "react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/router";
import { auth } from "@/app/firebaseConfig";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Layout from "@/components/Layout/page";
import ThemeToggle from "@/components/Toggle/themeToggle";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      document.cookie = `auth_token=${token}; path=/; secure; samesite=strict`;

      router.push("/admin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <div className="relative w-full max-w-md p-8 backdrop-blur border border-gray-300 dark:border-gray-800 shadow-lg rounded-2xl">
        <h2 className="text-3xl font-black tracking-wider text-center mb-6 text-gray-800 dark:text-white">
          Log In
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 tracking-wider mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 text-black border border-blue-300 dark:border-gray-500 shadow rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 text-black border border-blue-300 dark:border-gray-500 shadow rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white tracking-wider p-3 rounded-lg font-semibold hover:bg-blue-600 transition drop-shadow-[0_0.6px_0.6px_rgba(0,0,0,0.8)]"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full bg-red-500 text-white tracking-wider p-3 rounded-lg font-semibold hover:bg-red-600 transition mt-2 drop-shadow-[0_0.6px_0.6px_rgba(0,0,0,0.8)]"
          >
            <FaGoogle className="mr-2" />
            Continue with Google
          </button>
        </div>
        <div className="mt-4 text-center flex flex-row justify-center gap-1 items-center">
          <p className="text-gray-600 dark:text-gray-400">
            {`Don't have an account?`}
          </p>
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
          <div className=" absolute top-7 right-5">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
