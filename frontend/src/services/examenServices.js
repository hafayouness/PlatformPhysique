import { api } from "../lib/axios";

export const examsService = {
  list: (params = {}) => api.get("/exams", { params }).then((r) => r.data),
  detail: (id) => api.get(`/exams/${id}`).then((r) => r.data),
  create: (formData) =>
    api
      .post("/exams", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data),
  update: (id, data) => api.put(`/exams/${id}`, data).then((r) => r.data),
  delete: (id) => api.delete(`/exams/${id}`).then((r) => r.data),
};
