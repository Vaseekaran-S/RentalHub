import React from 'react'
import Header from './header'
import Footer from './footer'
import AdminHeader from './adminHeader'

function Layout({ children, isAdmin }) {
  return (
    <>
      {isAdmin ?
        <div className='container mx-auto px-5'>
          <AdminHeader />
          {children}
        </div>
        :
        <div className='container mx-auto px-5'>
          <Header />
          {children}
          <Footer />
        </div>
      }
    </>
  )
}

export default Layout
