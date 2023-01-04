import axios from "axios";
import { useState, useContext, useMemo, useRef, useEffect } from "react";
import { AxiosContext } from "../contexts/AxiosInstanceProvider";

const useAxios = (url: any = null, method = "GET", payload = {}) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const contextInstance = useContext(AxiosContext);
  const instance: any = useMemo(() => {
    return contextInstance || axios;
  }, [contextInstance]);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };
  const execute = async (
    _url: any = url,
    _method: any = method,
    payload?: any
  ) => {
    setError("");
    setLoaded(false);
    if (_method == "GET" && payload) {
      _url = _url + "?" + new URLSearchParams(payload).toString();
    }

    let data = null;
    try {
      const response = await instance.request({
        signal: controllerRef.current.signal,
        data: payload,
        method: _method,
        url: _url,
      });

      setData(response.data);
      data = response.data;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoaded(true);
    }
    return { data, error, loaded };
  };

  useEffect(() => {
    if (url) {
      execute(url, method, payload);
    } else {
      setData([]);
      setLoaded(true);
    }
  }, []);

  return { cancel, data, error, loaded, execute };
};

export default useAxios;
