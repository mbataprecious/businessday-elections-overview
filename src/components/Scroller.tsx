import React, { useState } from "react";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

function ScrollToTopAndBottom() {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.pageYOffset;

    if (scrollPosition > 200) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <div className="fixed bottom-12 right-6 z-[2000] bg-red-500 w-10 h-10 md:w-16 md:h-16 rounded-full flex flex-col justify-center items-center scroller">
      {showButton && (
        <button onClick={handleScrollToTop} className=" text-white">
          <BsChevronUp scale={2} />
        </button>
      )}
      <button onClick={handleScrollToBottom} className=" text-white">
        <BsChevronDown scale={2} />
      </button>
    </div>
  );
}

export default ScrollToTopAndBottom;
