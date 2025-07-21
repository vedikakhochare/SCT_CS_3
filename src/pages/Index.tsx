
import { useState } from "react";
import PasswordInput from "@/components/PasswordInput";
import PasswordStrengthMeter from "@/components/PasswordStrengthMeter";
import PasswordCriteria from "@/components/PasswordCriteria";
import { Shield, Lock, Key } from "lucide-react";

export interface PasswordStrength {
  score: number;
  level: 'weak' | 'medium' | 'strong' | 'very-strong';
  label: string;
  color: string;
}

export interface PasswordCriterion {
  id: string;
  label: string;
  met: boolean;
  weight: number;
}

const Index = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const calculatePasswordStrength = (pwd: string): PasswordStrength => {
    if (!pwd) {
      return { score: 0, level: 'weak', label: 'Enter a password', color: 'text-gray-400' };
    }

    let score = 0;
    const criteria = getPasswordCriteria(pwd);
    
    criteria.forEach(criterion => {
      if (criterion.met) {
        score += criterion.weight;
      }
    });

    if (score >= 85) {
      return { score, level: 'very-strong', label: 'Very Strong', color: 'text-strength-very-strong' };
    } else if (score >= 70) {
      return { score, level: 'strong', label: 'Strong', color: 'text-strength-strong' };
    } else if (score >= 40) {
      return { score, level: 'medium', label: 'Medium', color: 'text-strength-medium' };
    } else {
      return { score, level: 'weak', label: 'Weak', color: 'text-strength-weak' };
    }
  };

  const getPasswordCriteria = (pwd: string): PasswordCriterion[] => {
    return [
      {
        id: 'length',
        label: 'At least 8 characters',
        met: pwd.length >= 8,
        weight: 20
      },
      {
        id: 'uppercase',
        label: 'Contains uppercase letter',
        met: /[A-Z]/.test(pwd),
        weight: 15
      },
      {
        id: 'lowercase',
        label: 'Contains lowercase letter',
        met: /[a-z]/.test(pwd),
        weight: 15
      },
      {
        id: 'numbers',
        label: 'Contains numbers',
        met: /\d/.test(pwd),
        weight: 15
      },
      {
        id: 'special',
        label: 'Contains special characters',
        met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(pwd),
        weight: 15
      },
      {
        id: 'no-common',
        label: 'Not a common password',
        met: !['password', '123456', 'qwerty', 'abc123', 'password123'].includes(pwd.toLowerCase()),
        weight: 10
      }
    ];
  };

  const strength = calculatePasswordStrength(password);
  const criteria = getPasswordCriteria(password);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Matrix background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent animate-matrix-rain" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-cyber-green to-transparent animate-matrix-rain" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-secondary to-transparent animate-matrix-rain" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="flex justify-center mb-4">
            <div className="relative p-3 bg-gradient-to-r from-primary to-secondary rounded-full border border-primary/30 shadow-lg">
              <Shield className="w-8 h-8 text-primary-foreground animate-glow" />
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2 font-mono tracking-wider">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-glow">
              SECURE PASSWORD ANALYZER
            </span>
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            &gt; Advanced password security assessment protocol
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-card/80 backdrop-blur-lg border border-border rounded-2xl p-6 shadow-2xl animate-slide-up relative overflow-hidden">
          {/* Scan line effect */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line"></div>
          
          {/* Password Input */}
          <div className="mb-6">
            <PasswordInput
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </div>

          {/* Strength Meter */}
          {password && (
            <div className="mb-6">
              <PasswordStrengthMeter strength={strength} />
            </div>
          )}

          {/* Criteria Checklist */}
          <div className="mb-6">
            <PasswordCriteria criteria={criteria} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 animate-slide-up">
          <p className="text-muted-foreground text-sm flex items-center justify-center space-x-2 font-mono">
            <Lock className="w-4 h-4" />
            <span>&gt; Data never logged or transmitted // Local processing only</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
