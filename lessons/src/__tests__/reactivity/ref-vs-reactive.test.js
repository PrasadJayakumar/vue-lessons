import { beforeEach, describe, expect } from 'vitest';
import { ref, isRef, isReactive, toRaw } from 'vue';

describe('ref-vs-reactive', () => {
  let order;

  beforeEach(() => {
    order = [
      { id: 100, name: 'laptop', qty: 1, price: 1000 },
      { id: 101, name: 'mobile', qty: 1, price: 450 }
    ];
  });

  test('object-type', () => {
    debugger;

    // ref on object creates reactive object
    const orderRef = ref(order);

    //
    expect(isRef(orderRef)).toEqual(true);

    // reactive is deep
    expect(isReactive(orderRef.value)).toEqual(true);
    expect(isReactive(orderRef.value[0])).toEqual(true);
    expect(isReactive(orderRef.value[0].price)).toEqual(false);

    //
    const rawOrder = toRaw(orderRef.value);
    expect(Object.is(rawOrder, order)).toBe(true);
    expect(toRaw(orderRef.value)).toEqual(order);

    orderRef.value[0].qty = 2;
    expect(orderRef.value).toEqual(order);
  });
});

// References
// https://github.com/vuejs/core/blob/main/packages/reactivity/src/ref.ts
// https://github.com/vuejs/core/blob/main/packages/reactivity/src/reactive.ts
