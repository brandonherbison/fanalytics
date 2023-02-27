import { Route, Routes } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Home } from "./Home"
import { ReceivingStats } from "./RecievingStats"
import { RushingStats } from "./RushingStats"
import { PassingStats } from "./PassingStats"
import { WinStats } from "./WinStats"



export const ApplicationViews = () => {
    return (
        <>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/receiving-stats" element={<ReceivingStats />} />
            <Route path="/rushing-stats" element={<RushingStats />} />
            <Route path="/passing-stats" element={<PassingStats />} />
            <Route path="/win-stats" element={<WinStats />} />
        </Routes>
        </>
    )
}