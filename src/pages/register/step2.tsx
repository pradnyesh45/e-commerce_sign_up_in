import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { verifyEmail } from "~/server/utils/auth"; // Replace with your tRPC procedure path
import { userRouter } from "~/server/api/routers/user";

const Step2 = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { name, email = "user@example.com", password } = router.query || {}; // Retrieve data passed from step 1

  const handleVerify = async () => {
    try {
      const emailVerificationStatus = await verifyEmail(
        email as string,
        verificationCode,
      );
      if (emailVerificationStatus) {
        setIsVerified(true);
        // Redirect to protected page or display success message (optional)
        // const response = await fetch("/api/user/register", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ name, email, password }),
        // });
        const response = await userRouter.register({
          ctx: undefined,
          getRawInput: function (): Promise<unknown> {
            throw new Error("Function not implemented.");
          },
          path: "",
          type: "mutation",
        });
        // const response2 =  await userRouter.register.useQuery({

        // })
        if (response) {
          // User registration successful!
          router.push("/login"); // Redirect to login
        } else {
          setError("Registration failed. Please try again.");
        }
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-4 text-3xl font-bold text-gray-800">
        Registration Step 2
      </h1>
      <p>A verification code has been sent to your email address: {email}</p>
      <div className="mb-4">
        <label htmlFor="verificationCode" className="mb-2 block text-gray-700">
          Verification Code
        </label>
        <input
          type="text"
          id="verificationCode"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
      {error && <div className="mb-4 text-sm text-red-500">{error}</div>}
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleVerify}
        disabled={isVerified}
      >
        Verify Email
      </button>
      {isVerified && (
        <p className="mb-4 text-sm text-green-500">
          Email verified successfully!
        </p>
      )}
    </div>
  );
};

export default Step2;

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import faker from '@faker-js/faker'; // for generating mock category data

// export default function Step2() {
//   const router = useRouter();
//   const [categories, setCategories] = useState<({ id: number; name: string })[]>([]);
//   const [selectedCategories, setSelectedCategories] = useState(Array<string>);

//   useEffect(() => {
//     // Fetch categories from API or use mock data (replace with your API call)
//     const generatedCategories = [];
//     for (let i = 0; i < 100; i++) {
//       generatedCategories.push({
//         id: i,
//         name: faker.fakerEN_IN.commerce.department(),
//       });
//     }
//     setCategories(generatedCategories);
//   }, []);

//   const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { checked, value } = event.target;
//     const newSelectedCategories = [...selectedCategories];
//     if (checked) {
//       newSelectedCategories.push(value);
//     } else {
//       const index = newSelectedCategories.indexOf(value);
//       if (index > -1) {
//         newSelectedCategories.splice(index, 1);
//       }
//     }
//     setSelectedCategories(newSelectedCategories);
//   };

//   const handleSubmit = async (event: { preventDefault: () => void; }) => {
//     event.preventDefault();

//     const { name, email } = router.query || {}; // Access data passed from step 1

//     // Send data (user info and selected categories) to the backend for registration (replace with your API call)
//     const response = await fetch('/api/auth/register/step2', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name, email, categories: selectedCategories }),
//     });

//     if (response.ok) {
//       alert('Registration successful!');
//       // Redirect to login or other page
//       router.push('/login');
//     } else {
//       alert('Registration failed. Please try again.');
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-16">
//       <h1 className="text-3xl font-bold text-gray-800 mb-4">Registration Step 2</h1>
//       <p>Select your categories of interest:</p>
//       <form onSubmit={handleSubmit}>
//         <ul className="list-none space-y-2">
//           {categories.map((category) => (
//             <li key={category.id}>
//               <input
//                 type="checkbox"
//                 id={category.id.toString()}
//                 name={category.name}
//                 value={category.id.toString()} // Convert ID to string for form handling
//                 checked={selectedCategories.includes(category.id.toString())}
//                 onChange={handleCategoryChange}
//                 className="mr-2"
//               />
//               <label htmlFor={category.id.toString()}>{category.name}</label>
//             </li>
//           ))}
//         </ul>
//         <button type="submit" className="btn btn-primary">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }
