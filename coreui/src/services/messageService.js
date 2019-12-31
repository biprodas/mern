
import http from "./http";

const apiUrl = "/api/messages";


// Get all the Message
export function getMessages() {
  return http.get(apiUrl);
}

// Get a Message by Id
export function getMessage(id) {
  return http.get(`${apiUrl}/${id}`);
}

// Save a Message
export function saveMessage(data) {
  if(data._id){
    http.put(`${apiUrl}/${data._id}`, data);
  }
  return http.post(`${apiUrl}`, data);
}

// delete a Message
export function deleteMessage(id){
  return http.delete(`${apiUrl}/${id}`);
}