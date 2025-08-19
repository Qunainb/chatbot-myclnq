import React, { useState, useCallback } from "react";
import Robot from '/robot.png'

const HoverImage3D = () => {
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isHovering) return;

      const element = e.currentTarget;
      const rect = element.getBoundingClientRect();

      // Calculate relative position (0 to 1)
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      // Convert to degrees (-10 to 10)
      const rotateX = (y - 0.5) * -30;
      const rotateY = (x - 0.5) * 30;

      setTransform({ x: rotateX, y: rotateY });
    },
    [isHovering]
  );

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTransform({ x: 0, y: 0 });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="inline-block" style={{ perspective: "1000px" }}>
        <div
          className="transition-all duration-150 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `
              perspective(1000px)
              rotateX(${transform.x}deg)
              rotateY(${transform.y}deg)
              scale(${isHovering ? 1.1 : 1})
            `,
            transformOrigin: "center center",
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={Robot}
            alt="Bend effect"
            className="block"
            style={{
              width: "400px",
              margin: "0px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HoverImage3D;
