import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useGetLessonsByCategory } from '../../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, BookOpen } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import type { LessonCategory } from '../../backend';

interface LessonListByCategoryProps {
  categories: LessonCategory[];
}

export default function LessonListByCategory({ categories }: LessonListByCategoryProps) {
  const [expandedCategory, setExpandedCategory] = useState<bigint | null>(
    categories.length > 0 ? categories[0].id : null
  );

  const { data: lessons, isLoading } = useGetLessonsByCategory(expandedCategory);

  if (categories.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">No categories available yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id.toString()}
            variant={expandedCategory === category.id ? 'default' : 'outline'}
            onClick={() => setExpandedCategory(category.id)}
            className="transition-all"
          >
            {category.title}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {lessons && lessons.length > 0 ? (
            lessons.map((lesson) => (
              <Card key={lesson.id.toString()} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{lesson.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{lesson.content.substring(0, 150)}...</CardDescription>
                    </div>
                    <Badge variant="secondary">{lesson.difficulty}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {lesson.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Link to="/learn/$lessonId" params={{ lessonId: lesson.id.toString() }}>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <BookOpen className="h-4 w-4" />
                        Read Lesson
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No lessons available in this category yet.</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
