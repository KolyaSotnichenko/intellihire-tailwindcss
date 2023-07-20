"use client";

import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { firebase_app } from "../../utils/firebase";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/shared/Spinner";

interface IAuthContextType {
  user: User | null;
}

const auth = getAuth(firebase_app);

export const AuthContext = createContext<IAuthContextType>({ user: null });

export const useAuthContext = () => useContext(AuthContext);

interface IAuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({
  children,
}: IAuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   // Only redirect when the authentication process is completed
  //   if (!loading) {
  //     if (user) {
  //       router.push("/dashboard");
  //     } else {
  //       router.push("/");
  //     }
  //   }
  // }, [user, loading, router]);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
