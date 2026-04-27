import { Outlet } from "react-router-dom";
import { useState } from 'react'
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export function MainLayout(){
    const [count, setCount] = useState(0)

    return(
        // <div id="app-container" className="bg-gray-100 min-h-screen flex">
        <div>
            <div id="app-container" className="bg-gray-100 min-h-screen flex">
                <Sidebar />
                <div className="flex-1 p-4">
                    <Header />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}