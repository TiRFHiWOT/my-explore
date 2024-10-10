import { useState } from "react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/router";
import { auth, db } from "@/app/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Layout from "@/components/Layout/page";
import ThemeToggle from "@/components/Toggle/themeToggle";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        username,
        email,
        uid: user.uid,
      });

      router.push("/admin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        username: user.displayName || "",
        email: user.email || "",
        uid: user.uid,
      });

      console.log("User data saved to Firestore with UID:", user.uid);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <div className=" relative w-full max-w-md p-8 backdrop-blur border border-gray-300 dark:border-gray-800 shadow-lg rounded-lg">
        <div className=" absolute top-7 right-5">
          <ThemeToggle />
        </div>
        <h2 className="text-3xl font-black tracking-wider text-center mb-6 text-gray-800 dark:text-white">
          Sign up
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 tracking-wider mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full p-3 text-black border border-blue-300 shadow dark:border-gray-500 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 bg-gray-200 dark:bg-gray-800 dark:text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 tracking-wider mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 text-black border border-blue-300 shadow dark:border-gray-500 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 bg-gray-200 dark:bg-gray-800 dark:text-white"
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
              className="w-full p-3 text-black border border-blue-300 shadow dark:border-gray-500 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 bg-gray-200 dark:bg-gray-800 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 tracking-wider mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full p-3 text-black border border-blue-300 shadow dark:border-gray-500 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 bg-gray-200 dark:bg-gray-800 dark:text-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white tracking-wider p-3 rounded-lg font-semibold hover:bg-blue-600 transition drop-shadow-[0_0.6px_0.6px_rgba(0,0,0,0.8)]"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleSignUp}
            className="flex items-center justify-center w-full bg-red-500 text-white tracking-wider p-3 rounded-lg font-semibold hover:bg-red-600 transition mt-2 drop-shadow-[0_0.6px_0.6px_rgba(0,0,0,0.8)]"
          >
            <FaGoogle className="mr-2" />
            Continue with Google
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SignUpPage;
