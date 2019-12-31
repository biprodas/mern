
import http from "./http";

const apiUrl = "/api/users";


export function getUsers() {
  return http.get(apiUrl);
}

export function updateUsername(user){
  return http.put(`${apiUrl}/${user._id}`, user);
}

export function register(user) {
  //console.log(user);
  return http.post(`${apiUrl}/register`, {
    name: user.name,
    username: user.username,
    password: user.password,
    repeat_password: user.repeat_password
  });
}