import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

interface StepperControlProps {
  currentValue: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange: (value: number) => void;
}

export default function StepperControl({
  currentValue,
  min = 0,
  max = 999,
  step = 1,
  onValueChange,
}: StepperControlProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(currentValue.toString());

  const debouncedOnValueChange = useDebounce(onValueChange, 100);

  const handleIncrement = () => {
    const newValue = Math.min(currentValue + step, max);
    debouncedOnValueChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(currentValue - step, min);
    debouncedOnValueChange(newValue);
  };

  const handleDirectEdit = () => {
    setIsEditing(true);
    setEditValue(currentValue.toString());
  };

  const handleEditSubmit = () => {
    const numValue = parseFloat(editValue);
    if (!isNaN(numValue)) {
      const clampedValue = Math.max(min, Math.min(max, numValue));
      const roundedValue = Math.round(clampedValue);
      debouncedOnValueChange(roundedValue);
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
    <div className="flex h-8 items-center space-x-1">
      {/* Decrement Button */}
      <button
        className="btn btn-xs h-8 w-8 rounded-md"
        onClick={handleDecrement}
        disabled={currentValue <= min}
      >
        -
      </button>

      {/* Value Display/Edit */}
      {isEditing ? (
        <input
          type="number"
          className="input input-xs h-8 w-16 [appearance:textfield] rounded-md text-center focus:ring-0 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
          className="bg-base-200 text-base-content/70 hover:bg-base-300 flex h-8 w-16 cursor-pointer items-center justify-center rounded-md font-mono text-xs font-semibold"
          onClick={handleDirectEdit}
        >
          {currentValue}
        </div>
      )}

      {/* Increment Button */}
      <button
        className="btn btn-xs h-8 w-8 rounded-md"
        onClick={handleIncrement}
        disabled={currentValue >= max}
      >
        +
      </button>
    </div>
  );
}
