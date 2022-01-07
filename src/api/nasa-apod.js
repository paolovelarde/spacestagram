import axios from "axios";

const api_key = "Xwl5a7EWoghv2bcqbGcz2oneGdSu5QdqJylz6eu8";

export default axios.create({
  baseURL: "https://api.nasa.gov",
  params: {
    api_key
  }
});