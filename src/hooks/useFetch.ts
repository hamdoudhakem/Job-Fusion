import { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY } from "@env";

const rapidApiKey = RAPID_API_KEY;

export type rapidApiData = {
  job_apply_link: string;
  job_highlights: any;
  job_employment_type: string;
  employer_name: string;
  employer_logo: string;
  job_id: string;
  job_title: string;
  company_name: string;
  location: string;
  job_type: string;
  job_description: string;
  job_country: string;
};

type rapidApiRequestParams = {
  query?: string;
  num_pages?: number;
  location?: string;
  job_id?: string;
  date_posted?: string;
  page?: string;
};

export const useFetch = (endpoint: string, params: rapidApiRequestParams) => {
  const [data, setData] = useState<rapidApiData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "x-rapidapi-key": rapidApiKey,
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
    params: { ...params },
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      // console.log(
      //   "##################### Data ####################\n\n",
      //   response.data
      // );
      setData(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};
