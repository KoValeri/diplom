import axios from "axios";

const API_URL = "http://localhost:5000";

export const getBooks = async () => {
  try {
    const res = await axios.get(`${API_URL}/books`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
