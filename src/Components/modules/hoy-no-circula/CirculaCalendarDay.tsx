import { cn } from "@/lib/utils";

interface CirculaCalendarDayProps {
  date: Date;
  isSelected: boolean;
  isRestricted: boolean;
  onClick: (date: Date) => void;
}

export function CirculaCalendarDay({
  date,
  isSelected,
  isRestricted,
  onClick,
}: CirculaCalendarDayProps) {
  return (
    <button
      onClick={() => onClick(date)}
      className={cn(
        "relative flex flex-col items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-400 shrink-0",
        isSelected
          ? "bg-blue-600 text-white"
          : "text-gray-800 hover:bg-blue-50 cursor-pointer"
      )}
    >
      <span className="leading-none">{date.getDate()}</span>
      {isRestricted && (
        <span
          className={cn(
            "absolute bottom-1 w-1.5 h-1.5 rounded-full",
            isSelected ? "bg-blue-200" : "bg-blue-400"
          )}
        />
      )}
    </button>
  );
}
