export interface ICloneStore<T> {
  Clone(): T;
  ToDto?: () => any;
}
