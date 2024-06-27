import { db } from "@src/config/database";
import {
  StoredResponse,
  convertFromStoredResponse,
} from "@src/entities/response/dto/stored";
import type { ResponseId } from "../dto/id";

export const getResponseById = (props: ResponseId) => {
  try {
    const { id } = props;
    const selectQuery = db.prepare("SELECT * FROM Response WHERE id = $id");
    const storedResponse = selectQuery.get({ $id: id }) as StoredResponse;
    selectQuery.finalize();
    const response = convertFromStoredResponse({ storedResponse });
    return response;
  } catch (error) {
    throw new Error("Cannot get Response by id.");
  }
};
