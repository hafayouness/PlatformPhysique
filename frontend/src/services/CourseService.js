import { api } from "../lib/axios";

export const coursesService = {
  list: (params = {}) => api.get("/courses", { params }).then((r) => r.data),
  detail: (id) => api.get(`/courses/${id}`).then((r) => r.data),
  create: (data) => api.post("/courses", data).then((r) => r.data),
  update: (id, data) => api.put(`/courses/${id}`, data).then((r) => r.data),
  delete: (id) => api.delete(`/courses/${id}`).then((r) => r.data),
};
