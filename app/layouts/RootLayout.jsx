import React from 'react'
import Header from '../Share/Header/Header'
import ScrollToTopButton from '../Share/ScrollTop/ScrollTopButton'
import { Outlet } from 'react-router-dom'
import Footer from '../Share/Footer/Footer'

const RootLayout = () => {
    return (
        <div className='root-layout'>
            <Header />
            <ScrollToTopButton />

            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}

export default RootLayout