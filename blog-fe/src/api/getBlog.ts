import axios from "axios"
import { apiPaths } from "./paths"

export const getBlog = async (slug: string) => {
    const { data } = await axios.get<{templateId: string, content: any}>(apiPaths.getBlog(slug))
    return data;
}