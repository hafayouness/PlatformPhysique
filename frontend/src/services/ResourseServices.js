import { api } from "../lib/axios";

export const resourcesService = {
  byCourse: (courseId, params = {}) =>
    api.get(`/resources/course/${courseId}`, { params }).then((r) => r.data),
  detail: (id) => api.get(`/resources/single/${id}`).then((r) => r.data),
  create: (formData) =>
    api
      .post("/resources", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data),
  update: (id, data) => api.put(`/resources/${id}`, data).then((r) => r.data),
  delete: (id) => api.delete(`/resources/${id}`).then((r) => r.data),
};
