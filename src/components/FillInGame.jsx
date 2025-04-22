import { useState, useRef } from "react";

const questions = [
  {
    id: 1,
    sentence: "ماهو الجزء الذي يقوم بتنقية الدم من السموم؟",
    answer: "الكبد",
  },
  {
    id: 2,
    sentence: "تسمح لنا بالرؤية من خلال استقبال الضوء وتحويله إلى إشارات ____",
    answer: "العين",
  },
  {
    id: 3,
    sentence: "تنظفان الدم من الفضلات وتتحكمان في توازن السوائل___.",
    answer: "الكلي",
  },
  {
    id: 4,
    sentence: "---- مسؤول عن الشم وتنقية الهواء قبل دخوله للرئتين.",
    answer: "الأنف",
  },
];

export default function FillInGame({ onFinish }) {
  const [inputs, setInputs] = useState({});
  const [showResult, setShowResult] = useState(false);

  const successSound = useRef(null);
  const failSound = useRef(null);

  const handleChange = (id, value) => {
    setInputs((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const checkAnswers = () => {
    setShowResult(true);

    const correct = questions.filter(
      (q) => inputs[q.id]?.trim().toLowerCase() === q.answer.toLowerCase()
    ).length;

    if (correct >= questions.length / 2) {
      successSound.current?.play();
    } else {
      failSound.current?.play();
    }
  };

  const score = questions.filter(
    (q) => inputs[q.id]?.trim().toLowerCase() === q.answer.toLowerCase()
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#547792] to-[#94B4C1] flex flex-col items-center justify-center p-6 font-cairo text-right">
      {/* الأصوات */}
      <audio ref={successSound} src="/succes.mp3" />
      <audio ref={failSound} src="/wrong.mp3" />

      <h2 className="text-3xl font-bold text-[#ECEFCA] mb-10 animate-fade-in">
        أكمل الجمل التالية
      </h2>

      <div className="flex flex-col gap-6 w-full max-w-xl">
        {questions.map((q) => (
          <div
            key={q.id}
            className="bg-white p-5 rounded-2xl shadow-md animate-fade-in"
          >
            <label className="block text-lg font-semibold mb-2 text-gray-800">
              {q.sentence}
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={inputs[q.id] || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
              disabled={showResult}
            />
            {showResult && (
              <div className="mt-3 text-sm">
                {inputs[q.id]?.trim().toLowerCase() ===
                q.answer.toLowerCase() ? (
                  <span className="text-green-600">✅ إجابة صحيحة</span>
                ) : (
                  <span className="text-red-600">
                    ❌ الإجابة الصحيحة: {q.answer}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {!showResult ? (
        <button
          onClick={checkAnswers}
          className="mt-10 px-8 py-4 rounded-full bg-green-600 text-white font-bold text-lg hover:bg-green-700 shadow transition duration-300 animate-fade-in"
        >
          عرض النتيجة
        </button>
      ) : (
        <div className="mt-10 text-xl text-white animate-fade-in text-center">
          نتيجتك:{" "}
          <span className="font-bold text-green-300">
            {score} من {questions.length}
          </span>
          <div className="mt-4">
            <button
              onClick={() => onFinish(score)}
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow"
            >
              المرحلة التالية
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
