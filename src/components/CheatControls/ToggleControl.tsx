import { useDebounce } from '@/hooks/useDebounce';

interface ToggleControlProps {
  currentValue: boolean;
  onValueChange: (value: boolean) => void;
}

export default function ToggleControl({ currentValue, onValueChange }: ToggleControlProps) {
  const debouncedOnValueChange = useDebounce(onValueChange, 100);
  return (
    <div className="flex h-8 items-center">
      <input
        type="checkbox"
        className="toggle toggle-primary toggle-sm h-6 w-10"
        checked={currentValue}
        onChange={(e) => debouncedOnValueChange(e.target.checked)}
      />
    </div>
  );
}
