import axios from "axios";

const apiKey = "8c81bf5edeb64e5cbfb8b141465d1c38";

const bbcNewsEndpoint = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
const getNewsByQuery = `https://newsapi.org/v2/everything?q=apple&sortBy=popularity&apiKey=${apiKey}`;
const getNewsByHealth = `https://newsapi.org/v2/everything?q=health&sortBy=popularity&apiKey=${apiKey}`;
const popularNewsEndpoint = `https://newsapi.org/v2/everything?q=entertainment&sortBy=popularity&apiKey=${apiKey}`;
const authorEndpoints = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${apiKey}`;

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("Error", error);
  }
};

export const fetchBBCNews = () => {
  return apiCall(bbcNewsEndpoint);
};

export const fetchNewsByQuery = () => {
  return apiCall(getNewsByQuery);
};

export const fetchNewsByHealth = () => {
  return apiCall(getNewsByHealth);
};
export const fetchPopularEntertainment = () => {
  return apiCall(popularNewsEndpoint);
};
export const fetchAuthor = () => {
  return apiCall(authorEndpoints);
};
