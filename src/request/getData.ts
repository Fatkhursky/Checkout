import api from "../api/axios"

export default async function getData() {
  try {
    const data = await api.get('')
    return data
  } catch (error) {}
}
