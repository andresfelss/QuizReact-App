import React from 'react';
import './App.css';
import Background from './components/Background';
import IntroPage from './components/IntroPage';

function App() {
  const [showPage, setShowPage] = React.useState(true);
  function startQuiz(){
    setShowPage(prev => !prev);
  }

  return(
    <main>
      <Background />
      {showPage && <IntroPage startQuiz={startQuiz}/>}
    </main>
    
  )
}

export default App;
