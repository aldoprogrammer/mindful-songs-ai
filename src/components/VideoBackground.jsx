import React from "react";

export default function VideoBackground() {
  return (
    <video
      autoPlay
      loop
      muted
      className="absolute inset-0 w-full h-full object-cover z-0"
    >
      <source src="https://cdn.pixabay.com/video/2024/10/12/236005_tiny.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
