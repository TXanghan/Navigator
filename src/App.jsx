import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Form from './components/Form'
import "./App.css"
import UserRecode from './components/UseRecode'
import EditData from './components/EditData'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Form/>}></Route>
            <Route path='/UserRecode' element={<UserRecode/>}></Route>
            <Route path='/EditData/:id' element={<EditData/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

