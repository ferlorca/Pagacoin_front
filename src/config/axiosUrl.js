import axios from 'axios';

/// This is the correct way to do it.
// const baseURL = (process.env.NODE_ENV === 'production') ?
//   "https://us-central1-pagacoin-70429.cloudfunctions.net/api"
//   :
//   "http://localhost:3001"
//   ;


//This is not correct because we must have a develop enviroment, but currently we need to test pointing to production. 
const baseURL = "https://us-central1-pagacoin-70429.cloudfunctions.net/api";

const AxiosInstance = (function () {
  var _instance;
  
  function _getIntance() {
    if (!_instance) {
      _instance = axios.create({
        baseURL,
      })
      _instance.interceptors.request.use(
        config => {
          const token = localStorage.token;
          if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
          }
          config.headers['Content-Type'] = 'application/json';
          config.headers["Access-Control-Allow-Origin"]= "*";
          return config;
        },
        error => {
          Promise.reject(error)
        });
      return _instance
    }
    return _instance
  }

  return _getIntance()
})();

export default AxiosInstance;


 