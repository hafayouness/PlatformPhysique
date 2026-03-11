import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants/queryKeys";
import { resourcesService } from "../services/ResourseServices";

export const useResources = (courseId, filters = {}) =>
  useQuery({
    queryKey: queryKeys.resources.byCourse(courseId, filters),
    queryFn: () => resourcesService.byCourse(courseId, filters),
    enabled: !!courseId,
  });

export const useResource = (id) =>
  useQuery({
    queryKey: queryKeys.resources.detail(id),
    queryFn: () => resourcesService.detail(id),
    enabled: !!id,
  });

export const useCreateResource = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: resourcesService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["resources"] }),
  });
};

export const useDeleteResource = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: resourcesService.delete,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["resources"] }),
  });
};
