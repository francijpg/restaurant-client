import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Not Found - Restaurant App";
  }, []);

  return (
    <div className="mx-auto max-w-screen-lg">
      <p className="text-center text-2xl">Not Found!</p>
    </div>
  );
}
