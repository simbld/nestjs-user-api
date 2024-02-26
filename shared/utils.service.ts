import { Injectable } from "@nestjs/common";
import { DeleteResult } from "typeorm/driver/mongodb/typings";

@Injectable()
export class UtilsService {
  handleDeleteResponse(
    deleteResponse: DeleteResult & { affected: number },
    entityName: string
  ): void {
    if (deleteResponse.affected === 0) {
      throw new Error(`${entityName} not found`);
    }
  }

  createInstance<T>(entity: { new (): T }, data: any): T {
    const newEntity = new entity();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        newEntity[key] = data[key];
      }
    }
    return newEntity;
  }
}
