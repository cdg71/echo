import { db } from "@src/config/database";
import { getProfileById } from "@src/entities/profile/dao/getById";
import type { Profile } from "@src/entities/profile/schema";

export const updateProfile = (
  props: Omit<Profile, "createdAt" | "surveyId">
) => {
  try {
    const { id } = props;
    const prev = getProfileById({ id });
    const next = { ...prev, ...props } as Profile;
    const { position, area } = next;
    const query = db.prepare(`
      UPDATE Profile
      SET
        position = $position,
        area = $area
      WHERE
        id = $id;
    `);
    query.run({
      $id: id,
      $position: position ?? "",
      $area: area ?? null,
    });
    query.finalize();
    const profile = getProfileById({ id });
    return profile;
  } catch (error) {
    throw new Error("Cannot update profile.");
  }
};
