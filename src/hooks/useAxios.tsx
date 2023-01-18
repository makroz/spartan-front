import axios from "axios";
import { useState, useContext, useMemo, useRef, useEffect } from "react";
import { AxiosContext } from "../contexts/AxiosInstanceProvider";

const useAxios = (url: any = null, method = "GET", payload = {}) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [countAxios, setCountAxios] = useState(0);
  const contextInstance = useContext(AxiosContext);
  const instance: any = useMemo(() => {
    return contextInstance || axios;
  }, [contextInstance]);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };
  const reLoad = async (_payload: any = {}, prevent = false) => {
    if (prevent && countAxios == 0) return;
    await execute(url, method, _payload);
  };
  const execute = async (
    _url: any = url,
    _method: any = method,
    payload: any = {},
    Act: any = true
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
      if (Act) {
        setData(response.data);
      }
      data = response.data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoaded(true);
      //if (payload.origen) console.log("payload.origen", payload.origen);
    }
    return { data, error, loaded };
  };

  useEffect(() => {
    if (url) {
      setCountAxios(countAxios + 1);
      execute(url, method, payload);
    } else {
      setError("");
      setData([]);
      setLoaded(true);
    }
  }, []);

  return { countAxios, cancel, data, error, loaded, execute, reLoad };
};

export default useAxios;
