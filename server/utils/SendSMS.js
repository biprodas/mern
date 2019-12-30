
const request = require('request');

module.exports = SendSMS = async (number, message) => {
  return "SMS Sent";
  //return await request(`http://sms.iglweb.com/api/v1/send?api_key=44515511562731031551156273&contacts=${number}&senderid=Ekota&msg=${message}`);
}
