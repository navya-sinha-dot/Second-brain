import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";

export function useContent() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/content`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })

      .then((response) => {
        setContent(response.data.content);
      });
  }, []);
  return content;
}
