export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type RequiredNested<T> = {
  [K in keyof T]-?: T[K] extends object ? RequiredNested<T[K]> : T[K];
};
