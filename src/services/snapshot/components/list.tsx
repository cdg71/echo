import { Snapshot } from "@src/entities/snapshot/schema";
import { loadHeroIcons } from "@src/utils/loadHeroIcons";
import dayjs from "dayjs";

export const snapshotComponent = async (props: Snapshot) => {
  const dismissIcon = await loadHeroIcons({
    iconName: "x-mark",
    className: "size-6",
  });
  const checkIcon = await loadHeroIcons({
    iconName: "check-circle",
    className: "size-6",
  });
  return (
    <div
      id={`snapshot-${props.id}`}
      role="alert"
      class="alert my-2 bg-white bordered border-neutral-200 flex flex-row space-x-0"
    >
      <div>
        {props.readyAt ? (
          checkIcon
        ) : (
          <span class="loading loading-spinner loading-sm"></span>
        )}
      </div>
      <div>
        <div>
          {dayjs.unix(props.createdAt).format("Le DD/MM/YYYY à HH:mm:ss")}
        </div>
        <div class="label-text">{props.id}</div>
      </div>
      <div class="flex flex-grow flex-row-reverse">
        {props.readyAt ??
        dayjs().unix() - props.createdAt >=
          import.meta.env.CLOUD_GEN_ABORTABLE_AFTER_SEC ? (
          <button
            class="text-gray-600 hover:text-gray-800"
            hx-delete={`/snapshot/${props.id}`}
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
  );
};

export const snapshotsComponent = (props: Snapshot[]) =>
  props.map((snapshot) => snapshotComponent(snapshot));
