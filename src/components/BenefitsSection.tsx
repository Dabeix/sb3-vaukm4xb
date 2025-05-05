import React from 'react';

interface Benefit {
  title: string;
  icon: JSX.Element;
}

export const BenefitsSection = () => {
  const benefits: Benefit[] = [
    {
      title: "AMÉLIORER SON CARDIO",
      icon: "💪"
    },
    {
      title: "DRAINER SA CELLULITE",
      icon: "✨"
    },
    {
      title: "STIMULER SA CIRCULATION SANGUINE",
      icon: "🌊"
    },
    {
      title: "BOOSTER SON MENTAL",
      icon: "🧠"
    },
    {
      title: "RÉCUPÉRER PLUS VITE",
      icon: "⚡"
    }
  ];

  return (
    <div className="relative bg-gradient-to-b from-purple-900 to-purple-800 py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-16 text-4xl md:text-5xl font-bold text-white">
          LES 5 BIENFAITS<br />DE L'AQUABIKE
        </h2>

        <div className="max-w-4xl mx-auto space-y-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="text-center transform hover:scale-105 transition-transform duration-300"
            >
              <p className="text-2xl md:text-3xl text-white">
                <span className="mr-4">{benefit.icon}</span>
                {benefit.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};