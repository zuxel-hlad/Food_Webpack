const axios = require("axios").default;

/* ф-ция постинга данных */
const postData = async (url, data) => {
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: data,
  });
  return await result.json();
};

const getResource = (url) => {
  const result = axios.get(url);
  return result;
};
export { postData };
export { getResource };
