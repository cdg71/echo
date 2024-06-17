import { db } from "@src/config/database";
import { getResponseById } from "@src/entities/response/dao/getById";
import { convertToStoredResponse } from "../dto/stored";
import type { UpdateResponse } from "../dto/update";

export const updateResponse = (props: UpdateResponse) => {
  try {
    const { id } = props;
    const response = getResponseById({ id });
    const storedResponse = convertToStoredResponse({
      response: { ...response, ...props },
    });
    const query = db.prepare(`
      UPDATE Response
      SET
        answersJson = $answersJson
      WHERE
        id = $id;
    `);
    query.run({
      $id: storedResponse.id,
      $answersJson: storedResponse.answersJson,
    });
    query.finalize();
    const res = getResponseById({ id: storedResponse.id });
    return res;
  } catch (error) {
    console.log(error);
    throw new Error("Cannot update response.");
  }
};
