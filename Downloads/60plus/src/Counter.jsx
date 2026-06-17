import React, { useState } from 'react';

const Counter = ({ initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount);

  return (
    <button onClick={() => setCount(count + 1)} className="counter">
      Count is {count}
    </button>
  );
};

export default Counter;