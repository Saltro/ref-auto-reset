import { customRef, watch } from 'vue';

export function refWithReset<T>(
  value: T,
  sources: any,
  defaultValue?: T | (() => T),
) {
  function isValidFunction(t: T | (() => T)): t is (() => T) {
    return typeof t === 'function';
  }

  let refValue = value;
  return customRef<T>((track, trigger) => {
    watch(sources, () => {
      refValue = typeof defaultValue === 'undefined'
        ? value
        : isValidFunction(defaultValue)
          ? defaultValue()
          : defaultValue;
      trigger();
    });
    return {
      get() {
        track();
        return refValue;
      },
      set(newVal) {
        refValue = newVal;
        trigger();
      },
    };
  });
}

