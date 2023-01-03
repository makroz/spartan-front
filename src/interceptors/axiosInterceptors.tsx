const axiosInterceptors = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      let apiToken = null;
      try {
        apiToken = JSON.parse(localStorage.getItem("token") + "").token;
      } catch (e) {
        apiToken = null;
      }

      if (apiToken) {
        config.headers = {
          Authorization: "Bearer " + apiToken,
          accept: "application/json",
        };
      }

      // console.log("Request was sent");
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      // console.log("Response was received");
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        //window.location = "/login";
      }
      console.error("error error:", error);
      return Promise.reject(error);
    }
  );
};

export default axiosInterceptors;
