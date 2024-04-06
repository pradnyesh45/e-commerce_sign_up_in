import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function setSessionCookie(token: string, maxAge: number) {
  // document.cookie = `sessionToken=${token}; path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;
  localStorage.setItem("eCommerceToken", token);
}

const sessionToken = "your_secure_session_token"; // Replace with actual token generation logic
const maxAge = 60 * 60 * 24 * 7; // One week in seconds

export default function Login() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        setSessionCookie(data.sessionToken, maxAge); // Use data.sessionToken if provided by backend
        // Consider redirecting to a dashboard or protected route
        router.push("/protected", { query: { email } });
      } else {
        setError("Invalid email or password"); // Replace with more specific error handling
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again."); // Generic error for user
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-4 text-3xl font-bold text-gray-800">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            required
          />
        </div>
        {error && <div className="mb-4 text-sm text-red-500">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
