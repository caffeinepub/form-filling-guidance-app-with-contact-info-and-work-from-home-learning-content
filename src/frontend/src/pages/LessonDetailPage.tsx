import { useParams, Link } from '@tanstack/react-router';
import { useGetLesson, useGetDisclaimer } from '../hooks/useQueries';
import { ArrowLeft, Clock, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import ScamAwarenessChecklist from '../components/learn/ScamAwarenessChecklist';

export default function LessonDetailPage() {
  const { lessonId } = useParams({ from: '/learn/$lessonId' });
  const lessonIdBigInt = lessonId ? BigInt(lessonId) : null;
  const { data: lesson, isLoading: lessonLoading } = useGetLesson(lessonIdBigInt);
  const { data: disclaimer } = useGetDisclaimer();

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  if (lessonLoading) {
    return (
      <div className="container py-12 max-w-4xl">
        <Skeleton className="h-8 w-32 mb-8" />
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-48 mb-8" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="container py-12 max-w-4xl">
        <Link to="/learn">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Learn
          </Button>
        </Link>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Lesson not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const readingTime = estimateReadingTime(lesson.content);

  return (
    <div className="container py-12 max-w-4xl space-y-8">
      <Link to="/learn">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learn
        </Button>
      </Link>

      <div>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge variant="secondary" className="text-sm">
            {lesson.difficulty}
          </Badge>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{readingTime} min read</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4">{lesson.title}</h1>

        <div className="flex flex-wrap gap-2 mb-8">
          {lesson.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {disclaimer && (
        <Alert className="border-orange-500/50 bg-orange-50 dark:bg-orange-950/20">
          <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          <AlertDescription className="text-sm leading-relaxed text-foreground ml-2">
            {disclaimer}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Lesson Content
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">{lesson.content}</p>
        </CardContent>
      </Card>

      <ScamAwarenessChecklist />
    </div>
  );
}
