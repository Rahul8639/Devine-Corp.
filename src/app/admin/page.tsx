"use client";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
      
      // If not admin, redirect
      if (!user || user.email !== "rahulprasad9779@gmail.com") {
        router.push("/auth/login");
      }
    };
    
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || user.email !== "rahulprasad9779@gmail.com") {
    return <div>Access denied</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Welcome admin</h1>
      <p>Logged in as: {user.email}</p>
      <button onClick={handleLogout} style={{ marginTop: 20, padding: '10px 20px', fontSize: 18 }}>Logout</button>
    </div>
  );
}
