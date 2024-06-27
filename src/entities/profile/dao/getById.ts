import { db } from "@src/config/database";
import { Profile } from "@src/entities/profile/schema";
import type { ProfileId } from "../dto/id";

export const getProfileById = (props: ProfileId) => {
  try {
    const selectQuery = db.prepare("SELECT * FROM Profile WHERE id = $id");
    const profile = selectQuery.get({ $id: props.id }) as Profile;
    selectQuery.finalize();
    return profile;
  } catch (error) {
    throw new Error("Cannot get snapshot by id.");
  }
};
