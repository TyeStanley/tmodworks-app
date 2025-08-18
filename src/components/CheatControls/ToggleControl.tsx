interface ToggleControlProps {
  currentValue: boolean;
  onValueChange: (value: boolean) => void;
}

export default function ToggleControl({ currentValue, onValueChange }: ToggleControlProps) {
  return (
    <input
      type="checkbox"
      className="toggle toggle-primary toggle-sm"
      checked={currentValue}
      onChange={(e) => onValueChange(e.target.checked)}
    />
  );
}
