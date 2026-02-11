import { useGetLessonCategories, useGetDisclaimer } from '../hooks/useQueries';
import LearnHero from '../components/learn/LearnHero';
import LessonListByCategory from '../components/learn/LessonListByCategory';
import ScamAwarenessChecklist from '../components/learn/ScamAwarenessChecklist';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function LearnPage() {
  const { data: categories, isLoading: categoriesLoading } = useGetLessonCategories();
  const { data: disclaimer, isLoading: disclaimerLoading } = useGetDisclaimer();

  return (
    <div className="min-h-screen">
      <LearnHero />

      <div className="container py-12 space-y-12">
        {/* Disclaimer Section */}
        <div className="max-w-4xl mx-auto space-y-6">
          {disclaimerLoading ? (
            <Skeleton className="h-32 w-full" />
          ) : (
            disclaimer && (
              <Alert className="border-orange-500/50 bg-orange-50 dark:bg-orange-950/20">
                <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                <AlertDescription className="text-sm leading-relaxed text-foreground ml-2">
                  {disclaimer}
                </AlertDescription>
              </Alert>
            )
          )}

          <ScamAwarenessChecklist />
        </div>

        {/* Lessons by Category */}
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Learning Resources</h2>
            <p className="text-muted-foreground">
              Explore our curated lessons to help you get started with legitimate work-from-home opportunities.
            </p>
          </div>

          {categoriesLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 w-full" />
              ))}
            </div>
          ) : (
            <LessonListByCategory categories={categories || []} />
          )}
        </div>
      </div>
    </div>
  );
}
