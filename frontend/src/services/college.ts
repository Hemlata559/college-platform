const BASE_URL = import.meta.env.VITE_API_URL ||"http://localhost:5000";

export const getColleges = async () => {
  const res = await fetch(`${BASE_URL}/api/colleges`);
  if (!res.ok){
    throw new Error (`Server returned status code: ${res.status}`);
  }
  return res.json();
};
