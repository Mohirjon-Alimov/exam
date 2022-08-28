import { createContext, useState } from "react";

export const ThemeContext = createContext()

export const Theme = ({children})=> {
  const localTheme = window.localStorage.getItem('theme')
  const [ theme, setTheme] = useState(localTheme || 'dark')
  return(
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}