# A Vue composable make ref auto reset

## Description

A ref which will be reset to the default value when sources changed.

## Usage

```ts
import { ref } from 'vue';
import { refAutoReset } from 'ref-auto-reset';

const size = ref(10);
// refAutoReset will be reset when sources changed
const page = refAutoReset(1, size);

function changeSize(val: number) {
  // the value of page will reset to it's initial value 1
  size.value = val;
}
```

```ts
import { ref } from 'vue';
import { refWithReset } from 'ref-auto-reset';

const tableRef = ref<InstanceType<Table> | null>(null);
// refWithReset has no sources, only be reset when you manually call reset function
// defaultValue could be a getter
const page = refWithReset(1, () => {
  if (tableRef.value) return tableRef.value.getCurrPage();
});

function resetPage() {
  // reset could be executed manually
  page.reset();
}
```

## Type Declarations

```ts
export declare function refAutoReset<T>(
  value: T,
  sources: any,
  defaultValue?: T | (() => T),
): Ref<T> & { reset: () => T };

export declare function refWithReset<T>(
  value: T,
  defaultValue?: T | (() => T),
): Ref<T> & { reset: () => T };
```
