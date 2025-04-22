import { useState, useRef } from "react";
import clsx from "clsx";
import NextButton from "./NextButton";

const cards = [
  {
    id: 1,
    title: "القلب",
    image: "/heart.png",
    info: "القلب يضخ الدم إلى جميع أنحاء الجسم.",
  },
  {
    id: 2,
    title: "الرئتين",
    image: "/lung.jpg",
    info: "الرئتان مسؤلتان عن تبادل الأكسجين وثاني أكسيد الكربون.",
  },
  {
    id: 3,
    title: "الكبد",
    image: "/liver.jpg",
    info: "الكبد يقوم بتنقية الدم من السموم.",
  },
  {
    id: 4,
    title: "العين",
    image: "/eye.png",
    info: "العين تسمح لنا بالرؤية من خلال استقبال الضوء وتحويله إلى إشارات عصبية.",
  },
  {
    id: 5,
    title: "الدماغ",
    image: "/brain.jpg",
    info: "الدماغ هو مركز التحكم في الجسم والمسؤول عن التفكير والحركة والحواس.",
  },
  {
    id: 6,
    title: "الكلي",
    image: "/kidny.jpg",
    info: "الكليتان تنظفان الدم من الفضلات وتتحكمان في توازن السوائل.",
  },
  {
    id: 7,
    title: "البنكرياس",
    image: "/pancreas.jpg",
    info: "البنكرياس ينتج إنزيمات الهضم وهرمون الإنسولين لتنظيم السكر.",
  },
  {
    id: 8,
    title: "الأنف",
    image: "/noise.jpg",
    info: "الأنف مسؤول عن الشم وتنقية الهواء قبل دخوله للرئتين.",
  },
  {
    id: 9,
    title: "اللسان",
    image: "/tongue.jpg",
    info: "اللسان يُستخدم في التذوق والمضغ والبلع والكلام.",
  },
];

export default function InfoCards({ onNext }) {
  const [flippedCards, setFlippedCards] = useState([]);
  const flipSoundRef = useRef(null);

  const handleFlip = (id) => {
    if (!flippedCards.includes(id)) {
      flipSoundRef.current?.play();
      setFlippedCards((prev) => [...prev, id]);
    }
  };

  const allFlipped = flippedCards.length === cards.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#547792] to-[#94B4C1] flex flex-col items-center justify-center py-10 px-4 font-cairo text-right">
      <h2 className="text-3xl font-bold text-blue-800 mb-10 animate-fade-in">
        راجع معلوماتك أولا
      </h2>

      {/* عنصر الصوت */}
      <audio ref={flipSoundRef} src="/flipcard.mp3" preload="auto" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-5xl perspective">
        {cards.map((card) => {
          const flipped = flippedCards.includes(card.id);
          return (
            <div
              key={card.id}
              className="w-full h-60 sm:h-64 cursor-pointer"
              onClick={() => handleFlip(card.id)}
            >
              <div
                className={clsx(
                  "relative w-full h-full transition-transform duration-500 transform-style-preserve-3d",
                  flipped ? "rotate-y-180" : ""
                )}
              >
                {/* Front */}
                <div className="absolute w-full h-full flex flex-col items-center justify-center text-center bg-white rounded-2xl shadow-lg backface-hidden p-4">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-20 h-20 object-contain mb-2"
                  />
                  <p className="text-lg font-bold text-gray-700">
                    {card.title}
                  </p>
                </div>

                {/* Back */}
                <div className="absolute w-full h-full flex items-center justify-center text-base bg-blue-100 rounded-2xl shadow-lg rotate-y-180 backface-hidden p-4 leading-relaxed text-gray-800">
                  {card.info}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={onNext}
        disabled={!allFlipped}
        className="mt-6 px-6 py-3 text-lg rounded-full bg-blue-600 text-white hover:bg-blue-700 transition animate-fade-in"
      >
        ابدأ اللعبة
      </button>
    </div>
  );
}
