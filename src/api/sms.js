import request from 'superagent';

export function sendSms(obj) {
  const {
    phoneNumber, text, token, tokenMessage,
  } = obj;


  return request
    .post('http://localhost:5000/send')
    .send({
      phoneNumber, text, token, tokenMessage,
    }) // sends a JSON post body
    .set('X-API-Key', 'foobar')
    .set('accept', 'json')
    .then((err, res) => res);
}
