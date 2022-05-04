import { describe, expect } from 'vitest';
import { isRef, isReactive, ref, shallowRef, triggerRef, computed } from 'vue';

describe('shallow-ref', () => {
  const getOrder = () => [
    { id: 100, name: 'laptop', qty: 1, price: 1000 },
    { id: 101, name: 'mobile', qty: 1, price: 450 }
  ];

  test('ref-vs-shallowRef', () => {
    const orderA = ref(getOrder());
    expect(isRef(orderA)).toEqual(true);
    expect(isReactive(orderA.value)).toEqual(true);

    const orderB = shallowRef(getOrder());
    expect(isRef(orderB)).toEqual(true);
    expect(isReactive(orderB.value)).toEqual(false); // Makes it shallow
  });

  test('basics', () => {
    const order = shallowRef(getOrder());
    const total = computed(() =>
      order.value.reduce(
        (subTotal, item) => subTotal + item.qty * item.price,
        0
      )
    );
    // call atleast once
    expect(total.value).toEqual(1450);

    // Change the item price
    order.value[1].price = 550;
    expect(total.value).not.toEqual(1550);

    // Change the order
    order.value = [{ id: 103, name: 'keyboard', qty: 1, price: 50 }];
    expect(total.value).toEqual(50);
  });

  test('force-trigger', () => {
    const order = shallowRef(getOrder());
    const total = computed(() =>
      order.value.reduce(
        (subTotal, item) => subTotal + item.qty * item.price,
        0
      )
    );
    // call atleast once
    expect(total.value).toEqual(1450);

    // Re-computation will not happen due to shallowRef

    // Change the item price
    order.value[1].price = 550;
    expect(total.value).not.toEqual(1550);

    // Force trigger to re-compute
    triggerRef(order);
    expect(total.value).toEqual(1550);

    // Add a new item into order array
    order.value.push({ id: 102, name: 'keyboard', qty: 1, price: 50 });
    expect(total.value).not.toEqual(1600);

    // Force trigger to re-compute
    triggerRef(order);
    expect(total.value).toEqual(1600);
  });
});
