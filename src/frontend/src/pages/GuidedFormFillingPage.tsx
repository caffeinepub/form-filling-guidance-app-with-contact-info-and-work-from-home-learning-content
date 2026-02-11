import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import GuidedFormWizard from '../components/guided-form/GuidedFormWizard';

export default function GuidedFormFillingPage() {
  return (
    <div className="container py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3">Guided Form Filling</h1>
        <p className="text-lg text-muted-foreground">
          Step-by-step guidance to help you complete common online forms accurately and confidently.
        </p>
      </div>

      <Card className="mb-8 border-green-500/30 bg-green-50 dark:bg-green-950/20">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-200">How It Works</CardTitle>
          <CardDescription className="text-green-700 dark:text-green-300">
            Our guided wizard helps you prepare information for common forms
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-green-900 dark:text-green-100 space-y-2">
          <p>
            <strong>1. Choose a form type</strong> - Select from job applications, surveys, or registration forms
          </p>
          <p>
            <strong>2. Follow the steps</strong> - We'll guide you through each field with tips and examples
          </p>
          <p>
            <strong>3. Review your information</strong> - Check everything before you submit on the actual website
          </p>
          <p className="pt-2 font-semibold">
            Note: This tool helps you prepare. You'll need to submit the actual form on the organization's website.
          </p>
        </CardContent>
      </Card>

      <GuidedFormWizard />
    </div>
  );
}
