import { useEffect } from "react";
import { useRouter } from "next/router";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  return children;
}
