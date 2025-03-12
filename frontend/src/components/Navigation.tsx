import React from "react"
import { Link, useLocation } from "react-router-dom"

const Navigation: React.FC = () => {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white pixel-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="font-pixel text-lg text-xhs-pink">独立开发者大赛</span>
          </div>
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`inline-flex items-center px-1 pt-1 font-pixel text-sm
                ${isActive("/") ? "text-xhs-pink border-b-2 border-xhs-pink" : "text-xhs-gray hover:text-xhs-pink"}`}
            >
              项目展示
            </Link>
            <Link
              to="/submit"
              className={`inline-flex items-center px-1 pt-1 font-pixel text-sm
                ${isActive("/submit") ? "text-xhs-pink border-b-2 border-xhs-pink" : "text-xhs-gray hover:text-xhs-pink"}`}
            >
              提交项目
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
