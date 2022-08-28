import { createContext, useState } from "react";

export const LangContext = createContext();

export const LangProvider = ({children}) => {
  const localLang = window.localStorage.getItem('lang')
  const [ lang, setLang] = useState(localLang || 'uz')
  return(
    <LangContext.Provider value={{lang, setLang}}>
      {children}
    </LangContext.Provider>
  )
}