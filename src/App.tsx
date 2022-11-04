import { useEffect } from 'react'
import ScrollContainer from './components/ScrollContainer'
function App() {
  useEffect(() => {
    const remUnit = parseFloat(document.documentElement.style.fontSize)
    console.log(`remUnit: ${remUnit} px`)
  }, [])

  return (
    <div className="flex flex-col w-full justify-center items-center h-screen" style={{ paddingTop: '30px' }}>
      <ScrollContainer></ScrollContainer>
    </div>
  )
}

export default App
