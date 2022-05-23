import React from 'react';
import './App.css';
import Background from './components/Background';
import IntroPage from './components/IntroPage';
import QuizPage from './components/QuizPage';

function App() {
  const [showPage, setShowPage] = React.useState(true);
  function startQuiz(){
    setShowPage(prev => !prev);
  }

  return(
    <main>
      {showPage? <IntroPage startQuiz={startQuiz}/>: <QuizPage />}
      <Background />
    </main>
    
  )
}

export default App;
