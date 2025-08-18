import axios from "axios";

export const getQuestions = async (search = "", title="", page = 1, limit = 5) => {
  const response = await axios.get("http://localhost:3000/api/questions", {
    params: { search,title,  page, limit },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // pass the token
      "Content-Type": "application/json"
    }
  });
  console.log(response.data);
  return response.data;

};
