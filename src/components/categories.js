import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { Lang } from "./lang/lang";
import { LangContext } from "../context/langContext";
import { ThemeContext } from "../context/themeContext";

export const CategoriesLink = () => {
  const { theme } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);
  return (
    <>
      <ul className=" category-list d-flex justify-content-around">
        <Link
          className={
            theme === "dark" ? "category-link-dark " : "category-link-light"
          }
          to={"/timurid"}
        >
          {" "}
          {Lang[lang].temurids}{" "}
        </Link>
        <Link
          className={
            theme === "dark" ? "category-link-dark " : "category-link-light"
          }
          to={"/"}
        >
          {Lang[lang].jadids}{" "}
        </Link>
        <Link
          className={
            theme === "dark" ? "category-link-dark " : "category-link-light"
          }
          to={"/soviet"}
        >
          {Lang[lang].soviet}{" "}
        </Link>
        <Link
          className={
            theme === "dark" ? "category-link-dark " : "category-link-light"
          }
          to={"/independence"}
        >
          {Lang[lang].independence}
        </Link>
      </ul>

      <div>
        <Outlet />
      </div>
    </>
  );
};
