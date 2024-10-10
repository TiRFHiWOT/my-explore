import { useUser } from "@/components/Dashboard/userContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProfilePage = () => {
  const { user, logout } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return user ? (
    <div className="profile-page">
      <h1>Welcome, {user.username}</h1>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  ) : null;
};

export default ProfilePage;
