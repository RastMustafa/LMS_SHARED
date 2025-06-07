"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  UserCredential,
  User,
} from "firebase/auth";
import { auth } from "@/firebase";
import React from "react";

interface AuthContextType {
  user: User | null;
  signIn: ({
    password,
    email,
  }: {
    password: string;
    email: string;
  }) => Promise<UserCredential>;
  userLoading: boolean;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setUserLoading(false);
    });

    return () => unSubscribe();
  }, []);

  const signIn = async ({
    password,
    email,
  }: {
    password: string;
    email: string;
  }) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, logOut, userLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
