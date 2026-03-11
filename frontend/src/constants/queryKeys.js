export const queryKeys = {
  auth: {
    me: ["auth", "me"],
  },
  courses: {
    all: (filters = {}) => ["courses", "list", filters],
    detail: (id) => ["courses", "detail", id],
  },
  resources: {
    byCourse: (courseId, filters = {}) => ["resources", courseId, filters],
    detail: (id) => ["resources", "detail", id],
  },
  exams: {
    all: (filters = {}) => ["exams", "list", filters],
    detail: (id) => ["exams", "detail", id],
  },
};
