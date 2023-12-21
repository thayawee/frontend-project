import { useEffect, useState } from "react";
import { ContentDto } from "../types/types";
import { host } from "../constant";

const useContent = (id: string) => {
  const [content, setContent] = useState<ContentDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${host}/content/${id}`);
        const data = await response.json();

        setContent(data);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, [id]);

  return { content, isLoading, error };
};

export default useContent;
