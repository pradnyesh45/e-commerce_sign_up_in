import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import {
//   fetchCategories,
//   fetchSelectedCategories,
//   setSelectedCategories,
// } from "~/server/api/routers/category"; // Replace with your tRPC procedure paths

import { categoryRouter } from "~/server/api/routers/category";
import Cookies from "js-cookie";
import { error } from "console";
import { ProcedureCallOptions } from "@trpc/server/unstable-core-do-not-import";

interface ExtendedProcedureCallOptions<T> extends ProcedureCallOptions<T> {
  headers?: Record<string, string>;
}

const Protected = () => {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    [],
  );
  const [selectedCategories, setSelectedCategories] = useState(Array<number>);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6); // Number of categories per page
  const router = useRouter();
  // const sessionToken = Cookies.get('sessionToken');

  useEffect(() => {
    const fetchInitialData = async () => {
      const sessionToken = Cookies.get("eCommerceToken");
      if (sessionToken) {
        try {
          // Use tRPC calls for consistent API interactions
          // const categoriesData = await categoryRouter.fetchCategories({
          //   headers: { Authorization: `Bearer ${sessionToken}` },
          // } as ExtendedProcedureCallOptions<YourCategoryType>));
          // const selectedData = await categoryRouter.fetchSelectedCategories({
          //   headers: { Authorization: `Bearer ${sessionToken}` },
          // });
          const categoriesData = await categoryRouter.fetchCategories({
            ctx: undefined,
            getRawInput: function (): Promise<unknown> {
              throw new Error("Function not implemented.");
            },
            path: "",
            type: "query",
          });
          const selectedData = await categoryRouter.fetchSelectedCategories({
            ctx: undefined,
            getRawInput: function (): Promise<unknown> {
              throw new Error("Function not implemented.");
            },
            path: "",
            type: "query",
          });
          setCategories(categoriesData);
          setSelectedCategories(selectedData);
        } catch (error) {
          // Handle errors during data fetching
          console.error("Error fetching data:", error);
          // Optionally, redirect to a login page or display an error message
        }
      } else {
        // Handle cases where the session token is missing
        console.error("Session token not found");
        // Redirect to login or display an appropriate message
      }
    };

    if (router.isReady) {
      fetchInitialData();
    }
  }, [router.isReady]);

  const handleCategoryChange = async (
    categoryId: number,
    isChecked: boolean,
  ) => {
    const updatedSelection = [...selectedCategories];
    if (isChecked) {
      updatedSelection.push(categoryId);
    } else {
      const index = updatedSelection.indexOf(categoryId);
      if (index > -1) {
        updatedSelection.splice(index, 1);
      }
    }
    setSelectedCategories(updatedSelection);

    await setSelectedCategories(updatedSelection); // Update user's selection on the server
  };

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginatedCategories = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return categories.slice(startIndex, endIndex);
  };

  // function isString(value: string | string[]): value is string {
  //   return typeof value === "string";
  // }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-4 text-3xl font-bold text-gray-800">Protected Page</h1>
      <p>Welcome, {/* Display user's name if available */}</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {getPaginatedCategories().map((category) => (
          <div key={category.id} className="flex items-center space-x-4">
            <input
              type="checkbox"
              id={category.id.toString()}
              name={category.name}
              checked={selectedCategories.includes(category.id)}
              onChange={(e) =>
                handleCategoryChange(category.id, e.target.checked)
              }
              className="mr-2"
            />
            <label htmlFor={category.id.toString()}>{category.name}</label>
          </div>
        ))}
      </div>
      {/* Pagination controls (implement based on your needs) */}
      <button
        onClick={() => handlePagination(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        onClick={() => handlePagination(currentPage + 1)}
        disabled={currentPage === Math.ceil(categories.length / pageSize)}
      >
        Next
      </button>
    </div>
  );
};

export default Protected;
