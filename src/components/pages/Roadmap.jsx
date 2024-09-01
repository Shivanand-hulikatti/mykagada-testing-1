import React from 'react';
import { ArrowDownIcon } from 'lucide-react';

const RoadmapStep = ({ number, title, description, emoji, gradientFrom, gradientTo }) => (
  <div className={`relative p-6 rounded-xl shadow-lg mb-8 bg-gradient-to-r ${gradientFrom} ${gradientTo}`}>
    <div className="flex justify-between items-center">
      <div className="flex-1 pr-4">
        <h3 className="text-xl font-bold mb-2">{number}. {title}</h3>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
      <span className="text-4xl flex-shrink-0">{emoji}</span>
    </div>
  </div>
);

const Roadmap = () => {
  const steps = [
    { title: "Add Questions to Cart", description: "Select your desired questions", emoji: "📚", gradientFrom: "from-red-200", gradientTo: "to-red-100" },
    { title: "Choose Template", description: "Pick a layout for your questions", emoji: "📝", gradientFrom: "from-blue-200", gradientTo: "to-blue-100" },
    { title: "Add Watermark and Details", description: "Customize your document", emoji: "🖋️", gradientFrom: "from-green-200", gradientTo: "to-green-100" },
    { title: "Export PDF", description: "Generate your final document", emoji: "🖨️", gradientFrom: "from-yellow-200", gradientTo: "to-yellow-100" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-gray-100 rounded-xl p-6 sm:p-8">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <RoadmapStep number={index + 1} {...step} />
            {index < steps.length - 1 && (
              <div className="flex justify-center -mt-4 mb-4">
                <ArrowDownIcon className="w-6 h-6 text-gray-400 animate-bounce" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;