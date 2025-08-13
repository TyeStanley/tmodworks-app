interface KeybindControlProps {
  cheatType: string;
  order: number;
}

export default function KeybindControl({ cheatType, order }: KeybindControlProps) {
  // If cheat type is NUMBER, show up and down arrows with keybind
  if (cheatType === 'NUMBER') {
    return (
      <div className="flex space-x-1">
        <div className="bg-base-200 text-base-content/70 flex items-center rounded px-2 py-1 font-mono text-xs font-semibold">
          <span>↑</span>
          <span className="ml-1">{getKeybind(order)}</span>
        </div>
        <div className="bg-base-200 text-base-content/70 flex items-center rounded px-2 py-1 font-mono text-xs font-semibold">
          <span>↓</span>
          <span className="ml-1">Shift {getKeybind(order)}</span>
        </div>
      </div>
    );
  }

  // Else, show just the a toggle keybind
  return (
    <div className="bg-base-200 text-base-content/70 rounded px-2 py-1 font-mono text-xs font-semibold">
      {getKeybind(order)}
    </div>
  );
}

// Generate keybind based on cheat order (F1-F11, then Ctrl+F1-F11)
export const getKeybind = (order: number) => {
  if (order <= 11) {
    return `F${order}`;
  } else {
    return `Ctrl+F${order - 11}`;
  }
};
