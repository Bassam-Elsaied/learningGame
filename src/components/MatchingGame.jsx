import { useMemo, useState, useRef } from "react";

const data = [
  { id: 1, answer: "القلب", question: "يضخ الدم إلى جميع أنحاء الجسم" },
  { id: 2, answer: "الكلي", question: " يقوم بتنقية الدم من السموم" },
  {
    id: 3,
    answer: "الرئتين ",
    question: " مسؤلتان عن تبادل الأكسجين وثاني أكسيد الكربون. ",
  },
  {
    id: 4,
    answer: "الدماغ ",
    question: "  مركز التحكم في الجسم والمسؤول عن التفكير والحركة والحواس ",
  },
  {
    id: 5,
    answer: "البنكرياس ",
    question: "  ينتج إنزيمات الهضم وهرمون الإنسولين لتنظيم السكر ",
  },
];

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function MatchingGame({ onNext, setScore }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [matches, setMatches] = useState({});
  const [result, setResult] = useState({});
  const [done, setDone] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const successSound = useRef(null);
  const failSound = useRef(null);

  const shuffledData = useMemo(() => shuffleArray(data), []);
  const shuffledAnswers = useMemo(
    () => shuffleArray(shuffledData.map((d) => d.answer)),
    [shuffledData]
  );

  const handleSelectAnswer = (answer) => {
    if (selectedQuestion && !Object.values(matches).includes(answer)) {
      setMatches((prev) => ({
        ...prev,
        [selectedQuestion.id]: answer,
      }));
      setSelectedQuestion(null);
    }
  };

  const handleFinish = () => {
    const newResult = {};
    let correctCount = 0;

    shuffledData.forEach((item) => {
      const isCorrect = matches[item.id] === item.answer;
      newResult[item.id] = isCorrect;
      if (isCorrect) correctCount++;
    });

    setResult(newResult);
    setDone(true);
    setScore(correctCount);

    if (correctCount >= data.length / 2) {
      successSound.current?.play();
    } else {
      failSound.current?.play();
    }

    setTimeout(() => setShowNextButton(true), 0);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#547792] to-[#94B4C1] p-4 font-cairo text-right">
      <audio ref={successSound} src="/succes.mp3" />
      <audio ref={failSound} src="/wrong.mp3" />

      <h2 className="text-3xl font-bold mb-8 text-[#ECEFCA] animate-fade-in">
        قم بتوصيل العناصر الصحيحة
      </h2>

      <div className="grid grid-cols-2 gap-10 w-full max-w-4xl">
        {/* الأسئلة */}
        <div className="flex flex-col gap-4">
          {shuffledData.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedQuestion(item)}
              className={`p-4 rounded-2xl border text-right shadow transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                selectedQuestion?.id === item.id
                  ? "bg-blue-100 border-blue-500"
                  : "bg-white border-gray-300"
              }`}
            >
              {item.question}
              {matches[item.id] && (
                <div className="text-sm mt-1">
                  {done ? (
                    result[item.id] ? (
                      <span className="text-green-600">
                        ✅ {matches[item.id]}
                      </span>
                    ) : (
                      <div className="text-red-600">
                        ❌ {matches[item.id]}
                        <div className="mt-1 text-sm text-blue-800">
                          الإجابة الصحيحة: {item.answer}
                        </div>
                      </div>
                    )
                  ) : (
                    <span className="text-gray-500"> {matches[item.id]}</span>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* الإجابات */}
        <div className="flex flex-col gap-4">
          {shuffledAnswers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(answer)}
              className={`p-4 rounded-2xl border text-right shadow transition-all duration-300 transform hover:scale-105 ${
                Object.values(matches).includes(answer)
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-white border-gray-300"
              }`}
              disabled={Object.values(matches).includes(answer)}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>

      {!done && (
        <button
          onClick={handleFinish}
          disabled={Object.keys(matches).length !== data.length}
          className={`mt-10 px-8 py-4 text-lg rounded-full text-white font-bold shadow transition-all duration-300 ${
            Object.keys(matches).length === data.length
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          إنهاء المرحلة
        </button>
      )}

      {done && (
        <div className="mt-6 text-xl text-green-700 animate-fade-in">
          نتيجتك: {Object.values(result).filter(Boolean).length} من{" "}
          {data.length}
        </div>
      )}

      {showNextButton && (
        <button
          onClick={onNext}
          className="mt-6 px-6 py-3 text-lg rounded-full bg-blue-600 text-white hover:bg-blue-700 transition animate-fade-in"
        >
          المرحلة التالية
        </button>
      )}
    </div>
  );
}
