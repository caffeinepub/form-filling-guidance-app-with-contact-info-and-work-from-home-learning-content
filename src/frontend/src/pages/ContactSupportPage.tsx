import { useGetSupportContactInfo } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Clock, Shield } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import HelpRequestForm from '../components/support/HelpRequestForm';

export default function ContactSupportPage() {
  const { data: contactInfo, isLoading } = useGetSupportContactInfo();

  return (
    <div className="container py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3">Contact & Support</h1>
        <p className="text-lg text-muted-foreground">
          We're here to help you navigate work-from-home opportunities safely.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-green-600" />
              Support Information
            </CardTitle>
            <CardDescription>How to reach us</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <Skeleton className="h-24 w-full" />
            ) : (
              <p className="text-sm leading-relaxed text-muted-foreground">{contactInfo}</p>
            )}

            <div className="pt-4 space-y-3 border-t">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Response Time</p>
                  <p className="text-sm text-muted-foreground">We typically respond within 24-48 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Your Privacy</p>
                  <p className="text-sm text-muted-foreground">
                    We never share your information with third parties
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/30 bg-orange-50 dark:bg-orange-950/20">
          <CardHeader>
            <CardTitle className="text-orange-800 dark:text-orange-200">Important Reminder</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-orange-900 dark:text-orange-100 space-y-2">
            <p>
              <strong>We will NEVER:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Ask for payment for job opportunities</li>
              <li>Request your banking information</li>
              <li>Guarantee specific income amounts</li>
              <li>Ask you to pay upfront fees</li>
            </ul>
            <p className="pt-2">
              If anyone claiming to represent us asks for these things, please report it immediately using the form
              below.
            </p>
          </CardContent>
        </Card>
      </div>

      <HelpRequestForm />
    </div>
  );
}
