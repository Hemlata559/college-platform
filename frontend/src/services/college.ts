const BASE_URL = import.meta.env.VITE_API_URL ||"http://localhost:5000/api";

export const getColleges = async () => {
  const res = await fetch(`${BASE_URL}/colleges`);
  return res.json();
};
