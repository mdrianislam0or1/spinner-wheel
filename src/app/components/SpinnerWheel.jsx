"use client";
import { useState, useRef, useEffect } from 'react';

const SpinnerWheel = () => {
  const [names, setNames] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const canvasRef = useRef(null);

  const addName = () => {
    if (inputValue.trim()) {
      setNames([...names, inputValue.trim()]);
      setInputValue('');
    }
  };

  const spinWheel = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const arc = Math.PI / (names.length / 2);
    let startAngle = 0;
    const spinTime = Math.random() * 3 + 4 * 1000; 
    let spinAngleStart = Math.random() * 10 + 10;
    let spinTimeout = null;

    const drawWheel = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      names.forEach((name, index) => {
        const endAngle = startAngle + arc;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, endAngle, false);
        ctx.fillStyle = `hsl(${index * (360 / names.length)}, 100%, 50%)`;
        ctx.fill();
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((startAngle + endAngle) / 2);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px Arial';  
        ctx.textAlign = 'center';
        ctx.fillText(name, canvas.width / 4, 0);
        ctx.restore();
        startAngle = endAngle;
      });
    };

    const rotateWheel = (spinAngle) => {
      startAngle += (spinAngle * Math.PI) / 180;
      drawWheel();
      spinTimeout = requestAnimationFrame(() => rotateWheel(spinAngle));
    };

    const startSpin = () => {
      let spinAngle = spinAngleStart;
      rotateWheel(spinAngle);
      setTimeout(() => {
        cancelAnimationFrame(spinTimeout);
        setSelectedName(names[Math.floor(Math.random() * names.length)]);
      }, spinTime);
    };

    startSpin();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-row items-start justify-center">
        <canvas ref={canvasRef} width={500} height={500} className="border-2 border-gray-500"></canvas>
        <div className="ml-8">
          <h2 className="text-xl font-bold mb-4">Names List</h2>
          <ul className="list-disc list-inside">
            {names.map((name, index) => (
              <li key={index} className="text-lg">{name}</li>
            ))}
          </ul>
        </div>
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="mt-4 p-2 border rounded"
        placeholder="Enter a name"
      />
      <button onClick={addName} className="mt-2 p-2 bg-purple-500 text-white rounded">
        Add Name
      </button>
      <button onClick={spinWheel} className="mt-2 p-2 bg-indigo-500 text-white rounded">
        Spin Wheel
      </button>
      {selectedName && <p className="mt-4 text-2xl font-bold">Selected Name: {selectedName}</p>}
    </div>
  );
};

export default SpinnerWheel;
