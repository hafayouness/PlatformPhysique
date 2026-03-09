export const ROUTES = {
  HOME: "/",
  COURSES: "/courses",
  COURSE_DETAIL: "/courses/:id",
  EXAMS: "/exams",
  LOGIN: "/login",
  REGISTER: "/register",
  ADMIN: "/admin",
  ADMIN_COURSES: "/admin/courses",
  ADMIN_EXAMS: "/admin/exams",
  ADMIN_RESOURCES: "/admin/resources",
};

export const courseDetail = (id) => `/courses/${id}`;
export const coursesByFiliere = (filiere) => `/courses?filiere=${filiere}`;
