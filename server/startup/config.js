module.exports = function(){
  const jwtPrivateKey = process.env.jwtPrivateKey;
  if(!jwtPrivateKey){
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
  }
}