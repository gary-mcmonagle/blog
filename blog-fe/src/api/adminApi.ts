import { GetAllBlogResponse } from "../types/api/admin"
import axios from "axios"

const adminApibasePath = process.env.REACT_APP_API_BASE_URL;
export const getAllBlogs = async () : Promise<GetAllBlogResponse> => {
    const { data } = await axios.get<GetAllBlogResponse>(`${adminApibasePath}/api/blog`);
    return data;
}