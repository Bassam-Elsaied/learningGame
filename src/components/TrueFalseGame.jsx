import { useState, useRef } from "react";

const questions = [
  { id: 1, text: "القلب يضخ الدم.", correct: true },
  { id: 2, text: "الكبد مسؤول عن التنفس.", correct: false },
  { id: 3, text: "الدماغ يتحكم في الجسم.", correct: true },
  { id: 4, text: "العظام تضخ الأنسولين.", correct: false },
  { id: 5, text: "اللسان مسؤول عن الشم وتنقية الهواء", correct: false },
  {
    id: 6,
    text: "البنكرياس ينتج إنزيمات الهضم وهرمون الإنسولين لتنظيم السكر.",
    correct: true,
  },
];

export default function TrueFalseGame({ onFinish }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const successSound = useRef(null);
  const failSound = useRef(null);

  const handleAnswer = (isTrue) => {
    const correct = questions[current].correct === isTrue;
    if (correct) setScore((prev) => prev + 1);

    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
    } else {
      setShowResult(true);
      setTimeout(() => {
        if (score + (correct ? 1 : 0) >= questions.length / 2) {
          successSound.current?.play();
        } else {
          failSound.current?.play();
        }
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#547792] to-[#94B4C1] p-6 font-cairo text-center">
      <audio ref={successSound} src="/succes.mp3" />
      <audio ref={failSound} src="/wrong.mp3" />

      {!showResult ? (
        <>
          <h2 className="text-2xl text-white mb-6">
            {questions[current].text}
          </h2>
          <div className="flex gap-6">
            <button
              onClick={() => handleAnswer(true)}
              className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
            >
              ✅ صح
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
            >
              ❌ خطأ
            </button>
          </div>
        </>
      ) : (
        <div className="text-xl text-white">
          <p className="mb-4">
            انتهت المرحلة! نتيجتك: {score} من {questions.length}
          </p>
          <button
            onClick={() => onFinish(score)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            عرض النتيجة
          </button>
        </div>
      )}
    </div>
  );
}
