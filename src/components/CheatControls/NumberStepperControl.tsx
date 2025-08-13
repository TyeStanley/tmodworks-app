import { useState } from 'react';

interface NumberStepperControlProps {
  currentValue: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange: (value: number) => void;
}

export default function NumberStepperControl({
  currentValue,
  min = 0,
  max = 999,
  step = 1,
  onValueChange,
}: NumberStepperControlProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(currentValue.toString());

  const handleIncrement = () => {
    const newValue = Math.min(currentValue + step, max);
    onValueChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(currentValue - step, min);
    onValueChange(newValue);
  };

  const handleDirectEdit = () => {
    setIsEditing(true);
    setEditValue(currentValue.toString());
  };

  const handleEditSubmit = () => {
    const numValue = parseFloat(editValue);
    if (!isNaN(numValue)) {
      const clampedValue = Math.max(min, Math.min(max, numValue));
      onValueChange(clampedValue);
    }
    setIsEditing(false);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(currentValue.toString());
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {/* Decrement Button */}
      <button
        className="btn btn-xs btn-square btn-outline"
        onClick={handleDecrement}
        disabled={currentValue <= min}
      >
        -
      </button>

      {/* Value Display/Edit */}
      {isEditing ? (
        <input
          type="number"
          className="input input-xs w-16 text-center"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleEditSubmit}
          onKeyDown={handleEditKeyDown}
          min={min}
          max={max}
          step={step}
          autoFocus
        />
      ) : (
        <div
          className="bg-base-200 text-base-content/70 hover:bg-base-300 flex h-8 w-16 cursor-pointer items-center justify-center rounded font-mono text-xs font-semibold"
          onClick={handleDirectEdit}
        >
          {currentValue}
        </div>
      )}

      {/* Increment Button */}
      <button
        className="btn btn-xs btn-square btn-outline"
        onClick={handleIncrement}
        disabled={currentValue >= max}
      >
        +
      </button>
    </div>
  );
}
