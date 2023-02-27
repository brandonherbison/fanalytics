import { Route, Routes } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Home } from "./Home"



export const ApplicationViews = () => {
    return (
        <>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
        </>
    )
}