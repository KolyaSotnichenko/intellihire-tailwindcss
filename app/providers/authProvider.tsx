"use client";

import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import firebase_app from "../../utils/firebase";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";

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

  useEffect(() => {
    if (user == null) router.push("/");
    else router.push("/dashboard");
  }, [user]);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
