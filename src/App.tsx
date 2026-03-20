import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import BookingBar from './components/BookingBar'
import Home from './pages/Home'
import Styles from './pages/Styles'
import StyleDetail from './pages/StyleDetail'
import Placement from './pages/Placement'
import Quiz from './pages/Quiz'
import QuizResult from './pages/QuizResult'

export default function App() {
  return (
    <div className="min-h-screen bg-ink-black flex flex-col">
      <Navbar />
      <main className="flex-1 pb-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/styles" element={<Styles />} />
          <Route path="/styles/:slug" element={<StyleDetail />} />
          <Route path="/placement" element={<Placement />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/result" element={<QuizResult />} />
        </Routes>
      </main>
      <BookingBar />
    </div>
  )
}
