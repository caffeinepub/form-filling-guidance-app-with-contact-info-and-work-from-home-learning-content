import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { LessonCategory, Lesson } from '../backend';

export function useGetLessonCategories() {
  const { actor, isFetching } = useActor();

  return useQuery<LessonCategory[]>({
    queryKey: ['lessonCategories'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLessonCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetLessonsByCategory(categoryId: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Lesson[]>({
    queryKey: ['lessonsByCategory', categoryId?.toString()],
    queryFn: async () => {
      if (!actor || categoryId === null) return [];
      return actor.getLessonsByCategory(categoryId);
    },
    enabled: !!actor && !isFetching && categoryId !== null,
  });
}

export function useGetLesson(lessonId: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Lesson | null>({
    queryKey: ['lesson', lessonId?.toString()],
    queryFn: async () => {
      if (!actor || lessonId === null) return null;
      try {
        return await actor.getLesson(lessonId);
      } catch (error) {
        console.error('Error fetching lesson:', error);
        return null;
      }
    },
    enabled: !!actor && !isFetching && lessonId !== null,
  });
}

export function useGetDisclaimer() {
  const { actor, isFetching } = useActor();

  return useQuery<string>({
    queryKey: ['disclaimer'],
    queryFn: async () => {
      if (!actor) return '';
      return actor.getDisclaimer();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetSupportContactInfo() {
  const { actor, isFetching } = useActor();

  return useQuery<string>({
    queryKey: ['supportContactInfo'],
    queryFn: async () => {
      if (!actor) return '';
      return actor.getSupportContactInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitHelpRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, email, message }: { name: string; email: string; message: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitHelpRequest(name, email, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['helpRequests'] });
    },
  });
}
