
import http from "./http";

const apiUrl = "/api/smsTemplates";


// Get all the smsTemplate
export function getSmsTemplates() {
  return http.get(apiUrl);
}

// Get a SmsTemplate by Id
export function getSmsTemplate(id) {
  return http.get(`${apiUrl}/${id}`);
}

// Save a SmsTemplate
export function saveSmsTemplate(data) {
  //return console.log(data);
  if(data._id){
    return http.put(`${apiUrl}/${data._id}`, data);
  }
  return http.post(`${apiUrl}`, data);
}

// delete a SmsTemplate
export function deleteSmsTemplate(id){
  return http.delete(`${apiUrl}/${id}`);
}