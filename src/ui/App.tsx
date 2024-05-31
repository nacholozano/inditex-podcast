import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Application from 'application'
import Header from 'ui/components/Header/Header'
import LoadingContext from './contexts/loading/loading'
import Home from './pages/Home/Home'
import 'ui/styles.css'

function App() {
  const [loading, setLoading] = useState(false)

  return (
    <>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <Header title="Podcaster" loading={loading} />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              Component={Home}
              loader={() => Application.getPodcastsList()}
            ></Route>
          </Routes>
        </BrowserRouter>
      </LoadingContext.Provider>
    </>
  )
}

export default App
