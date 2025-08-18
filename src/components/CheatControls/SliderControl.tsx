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
  max = 100,
  step = 1,
  onValueChange,
}: SliderControlProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="text-center font-mono text-xs">{currentValue}</div>
      <input
        type="range"
        className="range range-primary range-xs w-20"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={(e) => onValueChange(parseFloat(e.target.value) || 0)}
      />
    </div>
  );
}
