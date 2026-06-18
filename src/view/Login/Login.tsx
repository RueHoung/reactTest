import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"
import type { User } from "firebase/auth";
import { useState, useEffect } from "react"
import { auth, googleProvider } from "@/services/firebase";

export function Login() {
    
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
        setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);
    const loginWithGoogle = async () => {
        try {
        await signInWithPopup(auth, googleProvider);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error(error);
            }
        }
    };

    const logout = async () => {
        await signOut(auth);
    };
  return (
    <div>
      {user ? (
        <>
            <h2>Hi, {user.displayName}</h2>
            <p>{user.email}</p>
            {user.photoURL && (
                <img
                    src={user.photoURL}
                    alt="avatar"
                    width={80}
                />
            )}
            <br />
            <button onClick={logout}>登出</button>
        </>
        ) : (
        <button onClick={loginWithGoogle}>使用 Google 登入</button>
      )}
    </div>
  )
}
