import { useEffect, useState } from "react";
import { ContentDto } from "../types/types";
import { host } from "../constant";

const useContentList = () => {
  const [contentList, setContentList] = useState<ContentDto[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${host}/content`);
        const data = await response.json();

        setContentList(data.data);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return { contentList, isLoading, error };
};

export default useContentList;
