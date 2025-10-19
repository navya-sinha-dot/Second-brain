import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";

export function useContent() {
  const [content, setContent] = useState<any[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/content`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        setContent(response.data.content);
      } catch (error) {
        console.error("Failed to fetch content", error);
      }
    };

    fetchContent();
  }, []);

  return [content, setContent] as const;
}
