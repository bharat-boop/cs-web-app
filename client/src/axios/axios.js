import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

const instance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const agentLogin = async (username, password) => {
  const req = await instance.post("/api/agent/login", { username, password });
  return req.data;
};

export const clientLogin = async (username, password) => {
  const req = await instance.post("/api/client/login", { username, password });
  return req.data;
};

export const agentRegister = async (name, username, email, password) => {
  const req = await instance.post("/api/agent/register", {
    name,
    username,
    password,
    email,
  });
  return req.data;
};

export const clientRegister = async (name, username, email, password) => {
  const req = await instance.post("/api/client/register", {
    name,
    username,
    email,
    password,
  });
  return req.data;
};

export const getQueries = async () => {
  const req = await instance.get("/api/agent/queries/noresp", {
    headers: {
      Authorization: cookies.get("token"),
    },
  });
  return req.data;
};

export const sendResponse = async (response, messageId) => {
  const req = await instance.post(
    "/api/agent/respq",
    {
      response,
      messageId,
      agentId: cookies.get("token"),
    },
    {
      headers: {
        Authorization: cookies.get("token"),
      },
    }
  );
  return req.data;
};
