
import { Check, X } from "lucide-react";
import { PasswordCriterion } from "@/pages/Index";

interface PasswordCriteriaProps {
  criteria: PasswordCriterion[];
}

const PasswordCriteria = ({ criteria }: PasswordCriteriaProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-foreground font-medium text-sm">Password Requirements</h3>
      <div className="space-y-2">
        {criteria.map((criterion) => (
          <div
            key={criterion.id}
            className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 ${
              criterion.met
                ? 'bg-strength-strong/10 border border-strength-strong/20'
                : 'bg-muted/10 border border-border/20'
            }`}
          >
            <div
              className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-300 ${
                criterion.met
                  ? 'bg-strength-strong text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {criterion.met ? (
                <Check className="w-3 h-3" />
              ) : (
                <X className="w-3 h-3" />
              )}
            </div>
            <span
              className={`text-sm transition-colors duration-300 ${
                criterion.met ? 'text-strength-strong' : 'text-muted-foreground'
              }`}
            >
              {criterion.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordCriteria;
