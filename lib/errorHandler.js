'use strict';
module.exports = function (err){
  console.error(err);
  throw new Error('🔥🔥Fallo en la operación del servidor 🔥🔥');
}
