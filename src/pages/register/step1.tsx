import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import registerUser from "~/server/api/routers/user"; // Replace with your tRPC procedure path
import * as EmailValidator from "email-validator";

const Step1 = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Implement form validation
    if (!name || !email || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!EmailValidator.validate(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    router.push("/register/step2", { query: { name, email, password } }); // Redirect and pass data

    // try {
    // const response = await fetch("/api/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ name, email, password }),
    // });
    // const response = await registerUser({ name, email });
    //   if (response.ok) {
    //     // User registration successful!
    //     router.push("/register/step2", { query: { name, email } }); // Redirect and pass data
    //   } else {
    //     setError("Registration failed. Please try again.");
    //   }
    // } catch (error) {
    //   console.error("Registration error:", error);
    //   setError("An unexpected error occurred. Please try again later.");
    // }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-4 text-3xl font-bold text-gray-800">
        Registration Step 1
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
          {error && error.includes("email") && (
            <div className="mb-4 text-sm text-red-500">{error}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="mb-2 block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Continue
        </button>
      </form>
    </div>
  );
};

export default Step1;

// import { useState } from 'react';
// import { useRouter } from 'next/router';

// export default function Step1() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (event: { preventDefault: () => void; }) => {
//     event.preventDefault();

//     // Implement form validation here (e.g., check for empty fields, email format)
//     if (!name || !email || !password) {
//       alert('Please fill in all required fields.');
//       return;
//     }

//     // Send data to the backend for registration (replace with your API call)
//     const response = await fetch('/api/auth/register/step1', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name, email, password }),
//     });

//     if (response.ok) {
//       // Redirect to step 2 or store data and navigate there
//       router.push('/register/step2', {
//         query: { name, email }, // Pass name and email as query params
//       }); // Pass data as query params
//     } else {
//       alert('Registration failed. Please try again.');
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-16">
//       <h1 className="text-3xl font-bold text-gray-800 mb-4">Registration Step 1</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="name" className="block text-gray-700 mb-2">
//             Full Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             placeholder="Enter your full name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="email" className="block text-gray-700 mb-2">
//             Email Address
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="password" className="block text-gray-700 mb-2">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Continue
//         </button>
//       </form>
//     </div>
//   );
// }
