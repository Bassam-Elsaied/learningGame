import { useEffect, useRef } from "react";
import { runFireworks } from "../lib/utils";

export default function Summary({ score }) {
  const winSound = useRef(null);

  useEffect(() => {
    if (score > 6) {
      runFireworks();
    }
    winSound.current?.play();
  }, [score]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white font-cairo p-6 text-center">
      {/* عنصر الصوت دايمًا موجود، لكن مصدره يتغير حسب النتيجة */}
      <audio
        ref={winSound}
        src={score > 6 ? "/finall.mp3" : "/game_over.mp3"}
      />

      {score > 6 ? (
        <>
          <h1 className="text-3xl mb-4">🎉 مبروك!</h1>
          <p className="text-xl mb-2">لقد أنهيت اللعبة بنجاح!</p>
        </>
      ) : (
        <>
          <h1 className="text-3xl mb-4">Game Over 😢</h1>
          <p className="text-xl mb-2">لقد أنهيت اللعبة راجع الكروت جيداً!</p>
        </>
      )}
      <p className="text-lg text-green-700 mb-6">مجموع نقاطك: {score}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
      >
        إعادة اللعب
      </button>
    </div>
  );
}
