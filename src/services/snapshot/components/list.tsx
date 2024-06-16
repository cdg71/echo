import { Snapshot } from "@src/entities/snapshot/schema";
import { loadHeroIcons } from "@src/utils/loadHeroIcons";
import dayjs from "dayjs";

export const snapshotsComponent = async (props: Snapshot[]) => {
  const dismissIcon = await loadHeroIcons({
    iconName: "x-mark",
    className: "size-6",
  });
  const checkIcon = await loadHeroIcons({
    iconName: "check-circle",
    className: "size-6",
  });
  return (
    <>
      {props.map((snapshot) => (
        <div
          role="alert"
          class="alert my-2 bg-white bordered border-neutral-200 flex flex-row space-x-0"
        >
          <div>
            {snapshot.readyAt ? (
              checkIcon
            ) : (
              <span class="loading loading-spinner loading-sm"></span>
            )}
          </div>
          <div>
            {dayjs.unix(snapshot.createdAt).format("DD/MM/YYYY HH:mm:ss")}
          </div>
          <div class="flex flex-grow flex-row-reverse">
            {snapshot.readyAt ? (
              <button
                class="text-gray-600 hover:text-gray-800"
                hx-delete={`/snapshot/${snapshot.id}`}
                hx-boost="true"
                hx-target="body"
              >
                {dismissIcon}
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
