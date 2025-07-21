
import { PasswordStrength } from "@/pages/Index";

interface PasswordStrengthMeterProps {
  strength: PasswordStrength;
}

const PasswordStrengthMeter = ({ strength }: PasswordStrengthMeterProps) => {
  const getGradientColor = (level: string) => {
    switch (level) {
      case 'weak':
        return 'from-strength-weak to-destructive';
      case 'medium':
        return 'from-strength-medium to-cyber-amber';
      case 'strong':
        return 'from-strength-strong to-cyber-green';
      case 'very-strong':
        return 'from-strength-very-strong to-cyber-blue';
      default:
        return 'from-muted to-border';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-foreground font-medium text-sm font-mono">&gt; STRENGTH_ANALYSIS</span>
        <span className={`font-semibold text-sm font-mono ${strength.color} animate-glow`}>
          [{strength.label.toUpperCase()}]
        </span>
      </div>
      
      {/* Strength Bar */}
      <div className="relative">
        <div className="w-full bg-muted/30 rounded-full h-4 overflow-hidden border border-border/50 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-scan-line"></div>
          <div
            className={`h-full bg-gradient-to-r ${getGradientColor(strength.level)} transition-all duration-500 ease-out relative shadow-lg`}
            style={{ width: `${strength.score}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse-strength"></div>
            <div className="absolute right-0 top-0 w-2 h-full bg-white/50 blur-sm"></div>
          </div>
        </div>
        
        {/* Score indicator */}
        <div className="flex justify-between mt-2 text-xs text-muted-foreground font-mono">
          <span>[WEAK]</span>
          <span>[SECURE]</span>
        </div>
      </div>

      {/* Score percentage */}
      <div className="text-center bg-muted/20 rounded p-2 border border-border/30">
        <span className="text-muted-foreground text-sm font-mono">
          SECURITY_SCORE: <span className={`font-bold ${strength.color} animate-glow`}>{strength.score}%</span>
        </span>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
