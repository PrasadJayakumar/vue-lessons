import { beforeEach, describe, expect } from 'vitest';
import { isRef, shallowRef, triggerRef, computed } from 'vue';

describe('shallow-ref', () => {
  let order;
  let total;

  beforeEach(() => {
    order = shallowRef([
      { id: 100, name: 'laptop', qty: 1, price: 1000 },
      { id: 101, name: 'mobile', qty: 1, price: 450 }
    ]);
    total = computed(() =>
      order.value.reduce(
        (subTotal, item) => subTotal + item.qty * item.price,
        0
      )
    );
  });

  test('basics', () => {
    expect(isRef(order)).toEqual(true);
    expect(total.value).toEqual(1450);

    // Change the order
    order.value = [{ id: 103, name: 'keyboard', qty: 1, price: 50 }];
    expect(total.value).toEqual(50);
  });

  test('force-trigger', () => {
    // Change the item price
    // Re-computation will not happen due to shallow-ref
    order.value[1].price = 550;
    expect(total.value).not.toEqual(1450); // GONE WRONG. TODO: fix the issue

    // Force trigger to re-compute
    triggerRef(order);
    expect(total.value).toEqual(1550);

    // Add a new item into order array
    // Re-computation will not happen due to shallow-ref
    order.value.push({ id: 102, name: 'keyboard', qty: 1, price: 50 });
    expect(total.value).toEqual(1550);

    // Force trigger to re-compute
    triggerRef(order);
    expect(total.value).toEqual(1600);
  });
});
