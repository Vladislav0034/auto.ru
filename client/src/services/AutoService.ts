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
}

export default new AutoService(apiInstance);