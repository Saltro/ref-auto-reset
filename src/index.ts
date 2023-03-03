import { Ref, customRef, watch } from 'vue';

export function refAutoReset<T>(
  value: T,
  sources: any,
  defaultValue?: T | (() => T),
) {
  function isValidFunction(t: T | (() => T)): t is (() => T) {
    return typeof t === 'function';
  }

  function getDefaultValue() {
    if (typeof defaultValue === 'undefined') return value;
    if (isValidFunction(defaultValue)) return defaultValue();
    return defaultValue;
  }

  let refValue = value;
  const res: Ref<T> & { reset: () => T } = customRef<T>((track, trigger) => {
    watch(sources, () => {
      refValue = getDefaultValue();
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
  }) as unknown as Ref<T> & { reset: () => T };
  res.reset = function () {
    this.value = getDefaultValue();
    return this.value;
  };
  return res;
}

export function refWithReset<T>(value: T, defaultValue?: T | (() => T)) {
  return refAutoReset(value, [], defaultValue);
}
