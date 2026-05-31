import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import loginCampus from "../assets/login-campus.svg";
import { loginWithPassword, registerAccount } from "../utils/api";
import { saveToStorage } from "../utils/storage";

type Props = {
  setCurrentUser: (value: string | null) => void;
};

type AuthMode = "login" | "signup";
//change api url to make it comatible for deployment
const loginWithGitHub = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  window.location.href = `${apiUrl}/auth/github`;
};

const LoginPage = ({ setCurrentUser }: Props) => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result =
        mode === "signup"
          ? await registerAccount(name, email, password)
          : await loginWithPassword(email, password);
      const nextUser = result.user.name || result.user.email;

      saveToStorage("authToken", result.token);
      saveToStorage("currentUser", nextUser);
      setCurrentUser(nextUser);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-hero" aria-label="Login to CollegeHub">
        <div className="login-visual">
          <img src={loginCampus} alt="Connected college campuses" />
        </div>

        <div className="login-card">
          <h1>{mode === "signup" ? "Create Account" : "Login"}</h1>

          <div className="auth-mode-tabs" role="tablist" aria-label="Authentication mode">
            <button
              type="button"
              className={mode === "login" ? "active" : ""}
              onClick={() => {
                setMode("login");
                setError("");
              }}
            >
              Login
            </button>
            <button
              type="button"
              className={mode === "signup" ? "active" : ""}
              onClick={() => {
                setMode("signup");
                setError("");
              }}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {mode === "signup" && (
              <>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                />
              </>
            )}

            <label htmlFor="email">Email</label>
            <input
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              type="email"
              autoComplete="email"
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
            />

            {error && <div className="auth-error">{error}</div>}

            <button className="button login-continue" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Please wait..." : mode === "signup" ? "Create Account" : "Login"}
            </button>
            <p>
              {mode === "signup"
                ? "Create your account to save favorites and access protected features"
                : "Login with your email and password to continue"}
            </p>
          </form>

          <div className="login-divider">--- or ---</div>

          <button className="button github-login" onClick={loginWithGitHub}>
            <svg aria-hidden="true" className="github-login-icon">
              <use href="/icons.svg#github-icon" />
            </svg>
            Continue with GitHub
          </button>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
