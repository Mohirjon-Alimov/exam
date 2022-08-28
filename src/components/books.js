import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ThemeContext } from "../context/themeContext";

export const CategoriesLinkBooks = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <ul className=" d-flex justify-content-around">
        <Link
          className={
            theme === "dark" ? "category-link-dark " : "category-link-light"
          }
          to="timurid-books"
        >
          Temuriylar davri{" "}
        </Link>
        <Link
          className={
            theme === "dark" ? "category-link-dark " : "category-link-light"
          }
          to="jadids-books"
        >
          Jadid davri{" "}
        </Link>
        <Link
          className={
            theme === "dark" ? "category-link-dark " : "category-link-light"
          }
          to="soviet-books"
        >
          Sovet davri{" "}
        </Link>
        <Link
          className={
            theme === "dark" ? "category-link-dark " : "category-link-light"
          }
          to="independence-books"
        >
          Mustaqillik davri
        </Link>
      </ul>

      <div>
        <Outlet />
      </div>
    </>
  );
};
