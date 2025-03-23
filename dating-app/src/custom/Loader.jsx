import React, { useState, useEffect } from "react";

const Loader = ({ children, minDelay = 3000 }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), minDelay);
    return () => clearTimeout(timer);
  }, [minDelay]);

  return loading ? (
    <div className="loader">
      {"Pookie".split("").map((letter, index) => (
        <span key={index} className="wave" style={{ animationDelay: `${index * 0.2}s` }}>
          {letter}
        </span>
      ))}
    </div>
  ) : (
    children
  );
};

export default Loader;
