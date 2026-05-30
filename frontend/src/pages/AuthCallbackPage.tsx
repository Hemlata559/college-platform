import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { saveToStorage } from "../utils/storage";

type JwtPayload = {
  name?: string;
  email?: string;
};

type Props = {
  setCurrentUser: (value: string | null) => void;
};

const decodeJwtPayload = (token: string): JwtPayload | null => {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const json = decodeURIComponent(
      atob(padded)
        .split("")
        .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`)
        .join("")
    );

    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
};

const AuthCallbackPage = ({ setCurrentUser }: Props) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) return;

    const payload = decodeJwtPayload(token);
    const nextUser = payload?.name || payload?.email || "GitHub User";

    saveToStorage("authToken", token);
    saveToStorage("currentUser", nextUser);
    setCurrentUser(nextUser);
    navigate("/", { replace: true });
  }, [navigate, setCurrentUser, token]);

  if (!token) {
    return (
      <main className="page-shell">
        <h1 className="section-title">Login failed</h1>
        <div className="alert-box">
          No login token was returned. <Link to="/login">Try again</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <h1 className="section-title">Signing you in...</h1>
      <div className="alert-box">Finishing GitHub login.</div>
    </main>
  );
};

export default AuthCallbackPage;
