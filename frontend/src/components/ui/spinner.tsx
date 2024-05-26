import { cn } from "@/lib/utils";
import { CgSpinner } from "react-icons/cg";

interface SpinnerProps {
  className?: string;
  text?: string;
  textHidden?: boolean;
  size?: number;
}
export default function Spinner({
  className,
  text = "Loading...",
  textHidden = false,
  size = 20,
}: SpinnerProps) {
  return (
    <div className={cn("w-fit flex items-center gap-2 font-medium", className)}>
      <span>
        <CgSpinner size={size} className="animate-spin" />
      </span>
      {!textHidden && text}
    </div>
  );
}
