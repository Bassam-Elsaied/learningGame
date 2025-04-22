import { useState, useRef } from "react";
import InfoCards from "./components/InfoCards";
import MatchingGame from "./components/MatchingGame";
import FillInGame from "./components/FillInGame";
import TrueFalseGame from "./components/TrueFalseGame";
import Summary from "./components/Score";
import NextButton from "./components/NextButton";

function App() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const musicRef = useRef(null);

  const startGame = () => {
    const audio = musicRef.current;
    if (audio) {
      audio.volume = 0.1;
      audio.play().catch(() => {});
    }
    setStep(1);
  };

  return (
    <>
      <audio ref={musicRef} src="/gameStart.mp3" loop />

      {step === 0 && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#547792] to-[#94B4C1] p-6 font-cairo text-center text-white">
          <h1 className="text-3xl mb-6">مرحبًا بك في اللعبة التعليمية!</h1>
          <NextButton onClick={startGame}>ابدأ اللعبة 🎮</NextButton>
        </div>
      )}

      {step === 1 && <InfoCards onNext={() => setStep(2)} />}

      {step === 2 && (
        <MatchingGame
          setScore={(userScore) => setScore((prev) => prev + userScore)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <FillInGame
          onFinish={(userScore) => {
            setScore((prev) => prev + userScore);
            setStep(4);
          }}
        />
      )}

      {step === 4 && (
        <TrueFalseGame
          onFinish={(userScore) => {
            setScore((prev) => prev + userScore);
            setStep(5);
          }}
        />
      )}

      {step === 5 && <Summary score={score} />}
    </>
  );
}

export default App;
