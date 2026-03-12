import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants/queryKeys";
import { examsService } from "../services/examenServices";

export const useExams = (filters = {}) =>
  useQuery({
    queryKey: queryKeys.exams.all(filters),
    queryFn: () => examsService.list(filters),
    staleTime: 1000 * 60 * 5,
  });

export const useExam = (id) =>
  useQuery({
    queryKey: queryKeys.exams.detail(id),
    queryFn: () => examsService.detail(id),
    enabled: !!id,
  });

export const useCreateExam = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: examsService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["exams"] }),
  });
};

export const useUpdateExam = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => examsService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["exams"] }),
  });
};

export const useDeleteExam = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: examsService.delete,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["exams"] }),
  });
};
