import { useEffect } from "react";
import Link from "../components/common/Link";
import Title from "../components/common/Title";
import * as ROUTES from "../constants/routes";

export default function NotFound() {
  useEffect(() => {
    document.title = "Not Found - RestaurantApp";
  }, []);

  return (
    <>
      <div className="text-center mx-auto max-w-screen-lg mt-10">
        <Title align="center">not found!</Title>
        <Link route={ROUTES.DASHBOARD}>back to homepage</Link>
      </div>
    </>
  );
}
