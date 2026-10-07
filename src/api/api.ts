import axios from "axios";
import type {NasaSearchResponse} from "../types/nasa";

// Just in case if the tokens run out of if we want to change the api, it is easier to do it here
const NASA_API = "https://images-api.nasa.gov";

export async function callAPI(query: string, mediaType: string = "image"): Promise<NasaSearchResponse> {
  //cache it! makes it quicker since we can grab from here instead of making long, 1,000+ resource api calls each time
  const cachedData = sessionStorage.getItem(`nasa-${query}`);

  if (cachedData) {
    return JSON.parse(cachedData);
  } else {

    const response = await axios.get<NasaSearchResponse>(
      `${NASA_API}/search`,
      {
        params: {
          q: query,
          media_type: mediaType,
          page_size: 1000,
        },
      }
    );

    sessionStorage.setItem(`nasa-${query}`, JSON.stringify(response.data));

    return response.data;
  }
}