import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation"
import ProjectList from "./components/ProjectList"
import ProjectSubmit from "./components/ProjectSubmit"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Navigation />
          <Routes>
            <Route path="/" element={<ProjectList />} />
            <Route path="/submit" element={<ProjectSubmit />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
