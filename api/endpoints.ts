import axios from "axios";

const prefix = "http://localhost:3001/";

export const searchDashboard = async () => {
  const { data, headers } = await axios.get(`${prefix}api/holdings`);

  console.log({ data, headers });

  return { data, headers };
};
