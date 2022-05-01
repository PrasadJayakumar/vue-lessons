import { beforeEach, describe, expect } from 'vitest';
import { ref, isRef, computed } from 'vue';

describe('ref', () => {
  test('non-reactive', () => {
    let a = 1;
    let b = 2;

    const lhs = (a + b) ** 2;
    expect(lhs).toEqual(9);

    a = 2;
    expect(lhs).toEqual(9); // should be 16
  });

  test('primitive-type', () => {
    let a = ref(1);
    let b = ref(2);

    expect(isRef(a)).toEqual(true);

    const lhs = computed(() => (a.value + b.value) ** 2);
    expect(lhs.value).toEqual(9);

    a.value = 2;
    expect(lhs.value).toEqual(16);
  });

  test('object-type', () => {
    let order = ref([
      { id: 100, name: 'laptop', qty: 1, price: 1000 },
      { id: 101, name: 'mobile', qty: 1, price: 450 }
    ]);

    expect(isRef(order)).toEqual(true);

    const total = computed(() =>
      order.value.reduce(
        (subTotal, item) => subTotal + item.qty * item.price,
        0
      )
    );
    expect(total.value).toEqual(1450);

    order.value[1].price = 550;
    expect(total.value).toEqual(1550);
  });
});
