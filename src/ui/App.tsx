import { Suspense, lazy, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from 'ui/components/Header/Header'
import LoadingContext from './contexts/loading/loading'
import FilterContext from './contexts/filter/filter'
import Home from './pages/Home/Home'
import 'ui/styles.css'
import styles from './styles.module.css'

const Podcast = lazy(() => import('./pages/Podcast/Podcast'))

function App() {
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState({ term: '' })

  return (
    <>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <FilterContext.Provider value={{ filter, setFilter }}>
          <BrowserRouter>
            <Header title="Podcaster" loading={loading} path="/" />
            <main className={styles.container}>
              <Suspense>
                <Routes>
                  <Route
                    path="/podcast/:podcastId/*"
                    Component={Podcast}
                  ></Route>
                  <Route path="/" Component={Home}></Route>
                </Routes>
              </Suspense>
            </main>
          </BrowserRouter>
        </FilterContext.Provider>
      </LoadingContext.Provider>
    </>
  )
}

export default App
