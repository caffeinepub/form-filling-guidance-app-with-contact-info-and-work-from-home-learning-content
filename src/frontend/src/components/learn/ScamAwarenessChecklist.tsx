import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function ScamAwarenessChecklist() {
  const redFlags = [
    'Requests for upfront payment or fees',
    'Promises of guaranteed high income',
    'Pressure to act immediately',
    'Requests for banking or sensitive personal information',
    'Poor grammar or unprofessional communication',
    'No verifiable company information',
  ];

  const greenFlags = [
    'Clear job description and requirements',
    'Verifiable company with online presence',
    'Professional communication',
    'Reasonable income expectations',
    'No upfront fees required',
    'Transparent payment terms',
  ];

  return (
    <Card className="border-2 border-orange-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
          <Shield className="h-6 w-6" />
          Scam Awareness Checklist
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-destructive mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Red Flags - Avoid These
          </h3>
          <ul className="space-y-2">
            {redFlags.map((flag, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-destructive mt-0.5">✗</span>
                <span className="text-muted-foreground">{flag}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t pt-6">
          <h3 className="font-semibold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Green Flags - Look For These
          </h3>
          <ul className="space-y-2">
            {greenFlags.map((flag, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                <span className="text-muted-foreground">{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
