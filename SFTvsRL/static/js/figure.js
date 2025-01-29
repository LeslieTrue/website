import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      title: "Figure 1",
      caption: "A visualization of the data distribution across different training epochs, showing the convergence of the model over time.",
    },
    {
      title: "Figure 2",
      caption: "GeneralPoints task with sequential revision. The model generates the next answer conditioned on all previous answers and information from the verifier. We adopt this paradigm for RL training and evaluation.",
    },
    {
      title: "Figure 3",
      caption: "Comparative analysis of model performance across different benchmarks and evaluation metrics.",
    },
  ];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    let newIndex = currentIndex + newDirection;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-8">
      <div className="relative h-96 overflow-hidden rounded-lg bg-gray-100">
        <AnimatePresence initial={false} custom={currentIndex}>
          <motion.div
            key={currentIndex}
            custom={currentIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full flex flex-col items-center justify-center"
          >
            <div className="w-full h-3/4 bg-gray-300 flex items-center justify-center">
              {/* Placeholder for actual image */}
              <div className="text-gray-500">Image {currentIndex + 1}</div>
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-bold mb-2">{images[currentIndex].title}</h3>
              <p className="text-sm text-gray-600">{images[currentIndex].caption}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
          onClick={() => paginate(1)}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;