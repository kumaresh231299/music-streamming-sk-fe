import React from 'react'
import Display from './Components/Display'
import MusicProvider from './Context/MusicContext'

const App = () => {
  return (
    <div>
      <MusicProvider>
        <Display />
      </MusicProvider>
    </div>
  )
}

export default App