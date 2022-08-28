import { useContext, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import './style.css'
import { Lang } from "../lang/lang"
import { LangContext } from "../../context/langContext"

export const  Modal = ({modal, setModal})=>{
  const { lang} = useContext(LangContext)
  const modalRef = useRef()

  const closeModal = (evt)=> {
    if(evt.target === modalRef.current){
     
      setModal(0)
    }
  }


  useEffect(()=>{
    const close = (evt)=> {
      if(evt.code === 'Escape'){
        setModal(false)
      }
    };
    if(modal){
      window.addEventListener("keyup" , close)
    }
    return()=> window.removeEventListener("keyup", close)
  },[modal, setModal])

  return(
    <Wrapper onClick={closeModal} ref={modalRef} className={ ` w-100 h-100 overlay  position-fixed top-0 start-0  d-flex align-items-center justify-content-center ${!modal ? 'd-none' : ''}`}>
    <Inner className=" modal-inner bg-light d-flex flex-column align-items-center justify-content-evenly  ">
      <Link onClick={()=> setModal(false)} to={'/settings'}>{Lang[lang].settings}</Link>
      <Link onClick={()=> setModal(false)} to={'/add-books'}>{Lang[lang].addBooks}</Link>
      <Link onClick={()=> setModal(false)} to={'/add-authors'}>{Lang[lang].addAuthors}</Link>
      <button onClick={()=> {
        setModal(false);
        window.localStorage.removeItem('token');
        window.location.reload(true)
        }} className=" btn btn-danger">{Lang[lang].logOut}</button>
      <button onClick={()=> setModal(false)} className=" btn btn-danger">{Lang[lang].close}</button>
    </Inner>
    </Wrapper>
  )
}
const Inner = styled.div`
width: 200px;
height: 220px;
padding: 10px;
border-radius: 18px;
`
const Wrapper = styled.div`
background-color: rgba(0, 0, 0, 0.479);
`