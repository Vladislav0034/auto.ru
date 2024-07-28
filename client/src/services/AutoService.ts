import type { AxiosInstance} from "axios";
import apiInstance from "./apiInstance";
import { AutoSchema, AutosSchema } from "../utils/validators";
import type { ApiResponce, AutoType, AutoDataType } from "../types/AutoTypes";


class AutoService {
    constructor( private readonly api: AxiosInstance) {}

    async getAutos(): Promise<ApiResponce> {
        const {data} = await this.api.get<ApiResponce>('/autos');
        return AutosSchema.parse(data);
    }

    async addAuto(obj: AutoDataType): Promise<AutoType> {
        const {data} = await this.api.post<AutoType>('/autos', obj);
        return AutoSchema.parse(data);
    }

    async deleteAuto(id: number): Promise<ApiResponce> {
        return this.api.delete(`/autos/${id}`);
}

async editAuto(id: number, obj: AutoDataType): Promise<AutoType> {
    const { data } = await this.api.patch<AutoType>(`/autos/${id}`, obj);
    return AutoSchema.parse(data);
  }
}

export default new AutoService(apiInstance);