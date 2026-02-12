import { useState } from 'react';
import { formTemplates } from './formTemplates';
import { validateForm } from './validators';
import type { FormType, FormData, FormTemplate } from './types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, ArrowRight, ArrowLeft, FileText, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type WizardStep = 'select' | 'fill' | 'review';

export default function GuidedFormWizard() {
  const [step, setStep] = useState<WizardStep>('select');
  const [selectedForm, setSelectedForm] = useState<FormTemplate | null>(null);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSelectForm = (formType: FormType) => {
    const template = formTemplates.find((t) => t.id === formType);
    if (template) {
      setSelectedForm(template);
      setFormData({});
      setCurrentFieldIndex(0);
      setErrors({});
      setStep('fill');
    }
  };

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    if (errors[fieldId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    if (!selectedForm) return;

    const currentField = selectedForm.fields[currentFieldIndex];
    const value = formData[currentField.id] || '';

    if (currentField.required && !value.trim()) {
      setErrors({ [currentField.id]: `${currentField.label} is required` });
      return;
    }

    if (currentFieldIndex < selectedForm.fields.length - 1) {
      setCurrentFieldIndex(currentFieldIndex + 1);
    } else {
      const validation = validateForm(selectedForm.fields, formData);
      if (validation.isValid) {
        setStep('review');
      } else {
        setErrors(validation.errors);
      }
    }
  };

  const handleBack = () => {
    if (currentFieldIndex > 0) {
      setCurrentFieldIndex(currentFieldIndex - 1);
    } else {
      setStep('select');
      setSelectedForm(null);
    }
  };

  const handleReset = () => {
    setStep('select');
    setSelectedForm(null);
    setFormData({});
    setCurrentFieldIndex(0);
    setErrors({});
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/message/P243ECCLGYITA1', '_blank', 'noopener,noreferrer');
  };

  const progress = selectedForm ? ((currentFieldIndex + 1) / selectedForm.fields.length) * 100 : 0;

  if (step === 'select') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Choose a Form Type</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {formTemplates.map((template) => (
            <Card
              key={template.id}
              className="cursor-pointer hover:shadow-lg transition-all hover:border-green-500/50"
              onClick={() => handleSelectForm(template.id)}
            >
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                </div>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">{template.fields.length} fields</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (step === 'fill' && selectedForm) {
    const currentField = selectedForm.fields[currentFieldIndex];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{selectedForm.title}</h2>
          <Badge variant="outline">
            Step {currentFieldIndex + 1} of {selectedForm.fields.length}
          </Badge>
        </div>

        <Progress value={progress} className="h-2" />

        <Card>
          <CardHeader>
            <CardTitle>{currentField.label}</CardTitle>
            {currentField.required && <Badge variant="destructive">Required</Badge>}
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className="border-green-500/30 bg-green-50 dark:bg-green-950/20">
              <Lightbulb className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="ml-2">
                <p className="font-medium text-green-800 dark:text-green-200 mb-1">Tip:</p>
                <p className="text-sm text-green-700 dark:text-green-300">{currentField.tip}</p>
                <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                  <strong>Example:</strong> {currentField.example}
                </p>
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor={currentField.id}>{currentField.label}</Label>
              {currentField.type === 'textarea' ? (
                <Textarea
                  id={currentField.id}
                  value={formData[currentField.id] || ''}
                  onChange={(e) => handleFieldChange(currentField.id, e.target.value)}
                  placeholder={currentField.example}
                  rows={6}
                  className={errors[currentField.id] ? 'border-destructive' : ''}
                />
              ) : currentField.type === 'select' ? (
                <Select
                  value={formData[currentField.id] || ''}
                  onValueChange={(value) => handleFieldChange(currentField.id, value)}
                >
                  <SelectTrigger className={errors[currentField.id] ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentField.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id={currentField.id}
                  type={currentField.type}
                  value={formData[currentField.id] || ''}
                  onChange={(e) => handleFieldChange(currentField.id, e.target.value)}
                  placeholder={currentField.example}
                  className={errors[currentField.id] ? 'border-destructive' : ''}
                />
              )}
              {errors[currentField.id] && <p className="text-sm text-destructive">{errors[currentField.id]}</p>}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={currentFieldIndex < selectedForm.fields.length - 1 ? handleNext : handleWhatsAppClick}>
            {currentFieldIndex < selectedForm.fields.length - 1 ? (
              <>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Join Fast!!
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'review' && selectedForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
          <div>
            <h2 className="text-2xl font-semibold">Review Your Information</h2>
            <p className="text-muted-foreground">Check everything before submitting on the actual website</p>
          </div>
        </div>

        <Alert className="border-orange-500/50 bg-orange-50 dark:bg-orange-950/20">
          <AlertDescription className="text-orange-900 dark:text-orange-100">
            <p className="font-semibold mb-2">Important Reminder:</p>
            <p className="text-sm">
              This tool helps you prepare your information. You must now go to the actual organization's website and
              submit the form there. Never share sensitive information (like passwords or banking details) through
              unofficial channels.
            </p>
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>{selectedForm.title}</CardTitle>
            <CardDescription>Your prepared information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedForm.fields.map((field) => (
              <div key={field.id} className="border-b pb-4 last:border-b-0">
                <Label className="text-muted-foreground">{field.label}</Label>
                <p className="mt-1 text-foreground whitespace-pre-wrap">{formData[field.id] || '(Not provided)'}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep('fill')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Edit Information
          </Button>
          <Button onClick={handleReset}>Start New Form</Button>
        </div>
      </div>
    );
  }

  return null;
}
