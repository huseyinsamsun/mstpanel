import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const AddUser =React.lazy(() => import('./views/pages/user/addUser'))
const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
   <Routes>

    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/404" element={<Page404 />} />
    <Route path="/500" element={<Page500 />} />
 
    <Route path="/home" element={<DefaultLayout />}>
        <Route path="dashboard" element={<DefaultLayout />} />
        <Route path="adduser" element={<AddUser />} />
        {/* other nested routes under /home */}
    </Route>

    
    <Route path="*" element={<Login />} /> {/* Wildcard route for undefined paths */}
</Routes>
      </Suspense>
      <ToastContainer /> 
    </HashRouter>
    
  )
}

export default App
