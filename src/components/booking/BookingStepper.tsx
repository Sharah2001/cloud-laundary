import { Check } from "lucide-react";

interface Props {
  currentStep: number;
  steps: string[];
}

export function BookingStepper({ currentStep, steps }: Props) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((label, i) => {
        const done = i < currentStep;
        const active = i === currentStep;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  done
                    ? "bg-accent text-accent-foreground"
                    : active
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`mt-1 text-xs font-medium hidden sm:block ${active ? "text-primary" : "text-muted-foreground"}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-12 md:w-20 h-0.5 mx-1 ${i < currentStep ? "bg-accent" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
