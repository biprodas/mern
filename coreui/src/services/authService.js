import http from './http';
import jwtDecode from "jwt-decode";

const apiUrl = "/api/users";
const tokenKey = "token";

setTimeout(() => {  
  http.setJWT(getJWT());
}, 1000);

export async function login(user) {
  const { data: token } = await http.post(`${apiUrl}/login`, { 
    username: user.username, 
    password: user.password 
  });
  localStorage.setItem(tokenKey, token);
  //const decoded = jwtDecode(token);
  //localStorage.setItem("user", JSON.stringify(decoded));
}

export function loginWithJWT(token) {
  localStorage.setItem(tokenKey, token);
}

export function logout() {
  // localStorage.removeItem(tokenKey);
  localStorage.clear();
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenKey);
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

export function getJWT() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJWT,
  logout,
  getCurrentUser,
  getJWT
};