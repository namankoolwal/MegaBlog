import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {AuthLayout} from './components'
import {Login, Home , Signup, AllPost, AddPost, EditPost, Post, MyPost} from './pages'
import About from './pages/About.jsx'
import ContactUs from './pages/ContactUs.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact-us' element={<ContactUs/>}/>
      <Route path='/login' element={<AuthLayout authentication={false}><Login/></AuthLayout>}/>
      <Route path='/signup' element={<AuthLayout authentication={false}><Signup/></AuthLayout>}/>
      <Route path='/all-posts' element={<AuthLayout authentication> {" "}<AllPost/></AuthLayout>}/>
      <Route path='/add-post' element={<AuthLayout authentication> {" "}<AddPost/></AuthLayout>}/>
      <Route path='/my-post' element={<AuthLayout authentication> {" "}<MyPost/></AuthLayout>}/>
      <Route path='/edit-post/:slug' element={<AuthLayout authentication> {" "}<EditPost/></AuthLayout>}/>
      <Route path='/post/:slug' element={<Post/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  // </React.StrictMode>,
)
