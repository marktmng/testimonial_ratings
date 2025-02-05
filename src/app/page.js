"use client";

import { useCallback, useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaStar,
} from "react-icons/fa";

// Array of testimonial objects containing customer feedback
const testimonials = [
  {
    firstName: "Sarah",
    lastName: "Johnson",
    description:
      "The product exceeded my expectations! The attention to detail and quality of service was outstanding. I would highly recommend this to anyone looking for a reliable solution.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    subtitle: "Marketing Director, Tech Corp",
  },
  {
    firstName: "Michael",
    lastName: "Chen",
    description:
      "Incredible experience from start to finish. The team was responsive, professional, and delivered exactly what we needed. This has transformed our workflow completely.",
    rating: 4,
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    subtitle: "Senior Developer, Innovation Labs",
  },
  {
    firstName: "Emma",
    lastName: "Williams",
    description:
      "Best decision we've made for our business this year. The implementation was smooth, and the results have been remarkable. The support team is always there when needed. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    subtitle: "CEO, StartUp Vision",
  },
];

// Renders a star rating display
const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={`${
            index < rating ? "text-yellow-400" : "text-gray-300"
          } w-5 h-5`}
        />
      ))}
    </div>
  );
};

// Renders an individual testimonial card with expandable text
const TestimonialCard = ({ testimonial }) => {
  const { firstName, lastName, description, rating, subtitle } = testimonial;
  const [isExpanded, setIsExpanded] = useState(false);

  const maxLength = 150; //Maximum characters to show before truncating
  const shouldShowReadMore = description.length > maxLength; //Determines if the read more button should be shown
  // Determines the text to display based on the current state
  const displayText =
    shouldShowReadMore && !isExpanded
      ? `${description.slice(0, maxLength)}...`
      : description;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-10 transition-all duration-300 hover:shadow-2xl border border-gray-100">
      <div className="flex flex-col items-center gap-6">
        <FaQuoteLeft className="text-4xl text-blue-500 mb-4" />
        <div className="flex-1 text-center">
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {displayText}
            {shouldShowReadMore && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="ml-2 text-blue-500 hover:text-blue-700 font-medium focus:outline-none"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            )}
          </p>
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-6"></div>
          <StarRating rating={rating} />
          <h3 className="text-2xl font-bold mt-4 text-gray-800">
            {firstName} {lastName}
          </h3>
          <p className="text-blue-600 font-medium mt-2">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * Main carousel component for displaying testimonials
 */
const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  /**
   * Advances to the next slide in the carousel
   * Wraps around to the beginning when reaching the end
   */
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  /**
   * Moves to the previous slide in the carousel
   * Wraps around to the end when reaching the beginning
   */
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  /**
   * Sets up auto-play functionality with cleanup
   * Interval runs every 5 seconds when auto-play is enabled
   */
  useEffect(() => {
    let intervalId;
    if (isAutoPlaying) {
      intervalId = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(intervalId);
  }, [isAutoPlaying, nextSlide]);

  /**
   * Handles keyboard navigation for accessibility
   */
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  };

  return (
    <div
      className="relative w-full py-16 bg-gradient-to-b from-gray-50 to-white"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      role="region"
      aria-label="Testimonial carousel"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 px-4"
                aria-hidden={currentIndex !== index}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-4 rounded-full shadow-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="w-6 h-6 text-blue-500" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-4 rounded-full shadow-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="w-6 h-6 text-blue-500" />
          </button>
        </div>

        <div className="flex justify-center mt-8 gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-blue-500 w-8"
                  : "bg-gray-300 w-2 hover:bg-blue-200"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
