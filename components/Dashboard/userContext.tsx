import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db, getDoc, setDoc, doc } from "@/app/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

interface User {
  username: string;
  email: string;
  profilePicture?: string;
}

interface UserContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  updateProfilePicture: (newProfilePicture: string) => Promise<void>;
  fetchUserProfile: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      console.log("Firebase User:", firebaseUser);
      if (firebaseUser) {
        await fetchUserProfile();
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;
      if (firebaseUser) {
        await setDoc(doc(db, "users", firebaseUser.uid), { name, email });
        await fetchUserProfile();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const firebaseUser = auth.currentUser;
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data() as User);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfilePicture = async (newProfilePicture: string) => {
    setError(null);
    try {
      const firebaseUser = auth.currentUser;
      if (firebaseUser) {
        await setDoc(
          doc(db, "users", firebaseUser.uid),
          {
            profilePicture: newProfilePicture,
          },
          { merge: true }
        );
        await fetchUserProfile();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        signUp,
        fetchUserProfile,
        updateProfilePicture,
        isLoading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
