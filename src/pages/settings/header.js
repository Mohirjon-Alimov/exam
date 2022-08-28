import { NavLink, Outlet } from "react-router-dom";
import "./styles.css";
import { Lang } from "../../components/lang/lang";
import { LangContext } from "../../context/langContext";
import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";

export const Header = () => {
  const { lang } = useContext(LangContext);
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <header>
        <nav>
          <ul className={`${theme}List nav-list list-unstyled d-flex`}>
            <li>
              <NavLink
                className={`({isActive})=> (isActive ? 'active': '') ${theme}Navlink`}
                to={"my-profile"}
              >
                {Lang[lang].myAccount}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={`({isActive})=> (isActive ? 'active': '') ${theme}Navlink`}
                to={"security"}
              >
                {Lang[lang].security}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={`({isActive})=> (isActive ? 'active': '') ${theme}Navlink`}
                to={"other-settings"}
              >
                {Lang[lang].otherSettings}
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <div>
        <Outlet />
      </div>
    </>
  );
};
