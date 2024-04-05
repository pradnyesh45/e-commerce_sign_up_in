import { useEffect, useState } from 'react';

function setSessionCookie(token: string, maxAge: number) {
    document.cookie = `sessionToken=${token}; path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;
}
  
const sessionToken = 'your_secure_session_token';
const maxAge = 60 * 60 * 24 * 7; // One week in seconds

function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Handle login logic, sending request to the `login` procedure
    const handleLogin = async (email: string, password: string) => {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);

        // Set the session token cookie on the client-side
        setSessionCookie(sessionToken, maxAge);
      } else {
        // Handle login error
      }
    };

    // ... (rest of your component logic)
  }, []);
}