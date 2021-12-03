var axios = require('axios');


export default axios.create({
  baseURL: "https://twp.oxy-development.fr/wp-json/wp/v2",
  headers: {
    Authorization: 'Basic ZXBpdGVjaDpFcGl0ZWNoMTM='  //+ data.getHeaders()   ??
  }

});