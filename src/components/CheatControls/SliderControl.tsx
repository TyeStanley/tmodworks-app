import { useDebounce } from '@/hooks/useDebounce';

interface SliderControlProps {
  currentValue: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange: (value: number) => void;
}

export default function SliderControl({
  currentValue,
  min = 0,
  max = 10,
  step = 0.1,
  onValueChange,
}: SliderControlProps) {
  const debouncedOnValueChange = useDebounce(onValueChange, 100);

  const formatValue = (value: number): string => {
    // If value is 0, show just "0" without decimal
    if (value === 0) {
      return '0';
    }
    // For all other values, show one decimal place
    return value.toFixed(1);
  };

  return (
    <div className="flex h-8 items-center space-x-4">
      <div className="flex items-center">
        <div className="text-center font-mono text-xs">
          {formatValue(currentValue)}
          {currentValue !== 0 && <span className="text-base-content/50 ml-[1.5px] text-xs">x</span>}
        </div>
      </div>
      <input
        type="range"
        className="range range-primary range-xs w-20"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={(e) => debouncedOnValueChange(parseFloat(e.target.value) || 0)}
      />
    </div>
  );
}
