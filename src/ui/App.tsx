import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from 'ui/components/Header/Header'
import LoadingContext from './contexts/loading/loading'
import Home from './pages/Home/Home'
import Podcast from './pages/Podcast/Podcast'
import 'ui/styles.css'
import styles from './styles.module.css'

function App() {
  const [loading, setLoading] = useState(false)

  return (
    <>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <BrowserRouter>
          <Header title="Podcaster" loading={loading} path="/" />
          <main className={styles.container}>
            <Routes>
              <Route path="/podcast/:podcastId/*" Component={Podcast}></Route>
              <Route path="/" Component={Home}></Route>
            </Routes>
          </main>
        </BrowserRouter>
      </LoadingContext.Provider>
    </>
  )
}

export default App
