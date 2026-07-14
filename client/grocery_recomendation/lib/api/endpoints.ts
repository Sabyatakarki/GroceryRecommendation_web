const ENDPOINTS = {
  AUTH: {
    REGISTER: "/users/register",
    LOGIN: "/users/login",
    PROFILE: "/users/profile",
  },

  PRODUCTS: {
    GET_ALL: "/products",
    GET_BY_ID: (id: string) => `/products/${id}`,
    CREATE: "/products",
    UPDATE: (id: string) => `/products/${id}`,
    DELETE: (id: string) => `/products/${id}`,
  },

  RECOMMENDATIONS: {
    GET_ALL: "/recommendations",
  },
};

export default ENDPOINTS;