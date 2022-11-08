import axios from "axios"

const TOKEN = "cdcbvjaad3i6ap45tv0gcdcbvjaad3i6ap45tv10"

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN
  }
})