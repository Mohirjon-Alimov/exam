import { Header } from './components/header'
import Img from './assets/img/hero-img.png'
import styled from 'styled-components'
import { Route, Routes} from 'react-router-dom'
import { CategoriesLink } from './components/categories'
import { CategoriesLinkBooks } from './components/books'
import { RenderBooks } from './components/books/books'
import { SearchAuthor } from './components/search/searchAuthors'
import { SearchBooks } from './components/search/serchBooks'
import { useContext, useState } from 'react'
import { RenderAuthors } from './components/authors/renderAuthors'
import { Lang } from './components/lang/lang'
import { LangContext } from './context/langContext'

export const Home = ({modal, setModal})=> {
  const { lang} = useContext(LangContext)
  let [value, setValue] = useState('')
  let [ author, setAuthor] = useState('')
  return(
    <>
    <Header  modal={modal} setModal={setModal}/>
    <div className='d-flex  justify-content-center'>
      <img src={Img} width={1260} height='345' alt="hero" />
    </div>

    <Routes>
      <Route path='/'element={<SearchAuthor setAuthor={setAuthor} />}>
        <Route path='*' element={<SearchAuthor setAuthor={setAuthor} />} />
      </Route>
      <Route path='/books'element={<SearchBooks setValue={setValue} />}>
        <Route path='*' element={<SearchBooks setValue={setValue} />} />
      </Route>
    </Routes>

    <Categories className='categories'>{Lang[lang].mainCategories}</Categories>

    <Routes>
      <Route path='/' element={<CategoriesLink />}>
        <Route index element={<RenderAuthors id={2}setAuthor={setAuthor} value={ author} />} />
        <Route path='timurid' element={<RenderAuthors id={1} setAuthor={setAuthor} value={ author} />} />
        <Route path='soviet' element={<RenderAuthors id={3} setAuthor={setAuthor} value={ author} />} />
        <Route path='independence' element={<RenderAuthors id={4} setAuthor={setAuthor} value={ author} />} />
        <Route path='*' element={<h2 className=' text-light'>errorr</h2>} />
      </Route>
      <Route path='/books' element={<CategoriesLinkBooks />}>
        <Route index element={<RenderBooks setValue={setValue} value={value} id={2} />} />
        <Route path='jadids-books' element={<RenderBooks setValue={setValue} value={value} id={2} />} />
        <Route path='soviet-books' element={<RenderBooks setValue={setValue} value={value} id={3} />} />
        <Route path='timurid-books' element={<RenderBooks setValue={setValue} value={value} id={1} />} />
        <Route path='independence-books' element={<RenderBooks setValue={setValue} value={value} id={4} />} />
       <Route path='*' element={<h2 className=' text-light'>errorr</h2>} />
      </Route>
      
    </Routes>

    </>
  )
}
const Categories = styled.h4 `
text-align: center;
font-family: 'RotterburgDisplayFont';
font-style: normal;
font-weight: 400;
color: #c9ac8c;
font-size: 31px;
line-height: 34px;
`