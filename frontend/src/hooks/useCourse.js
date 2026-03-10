import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants/queryKeys";
import { coursesService } from "../services/courses.service";

export const useCourses = (filters = {}) =>
  useQuery({
    queryKey: queryKeys.courses.all(filters),
    queryFn: () => coursesService.list(filters),
    staleTime: 1000 * 60 * 2,
  });

export const useCourse = (id) =>
  useQuery({
    queryKey: queryKeys.courses.detail(id),
    queryFn: () => coursesService.detail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 2,
  });

export const useCreateCourse = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: coursesService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["courses"] }),
  });
};

export const useUpdateCourse = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => coursesService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["courses"] }),
  });
};

export const useDeleteCourse = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: coursesService.delete,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["courses"] }),
  });
};
