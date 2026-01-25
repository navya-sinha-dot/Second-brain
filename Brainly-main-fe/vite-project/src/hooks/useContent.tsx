import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState, useCallback } from "react";

export function useContent() {
  const [content, setContent] = useState<any[]>([]);

  const fetchContent = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { content, setContent, refresh: fetchContent };
}
