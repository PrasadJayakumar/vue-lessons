import { beforeEach, expect } from 'vitest';
import { ref, shallowRef, triggerRef, computed, isRef, toRefs } from 'vue';

describe('ref', () => {
  test('non-reactive', () => {
    let a = 1;
    let b = 2;

    const lhs = (a + b) ** 2;
    expect(lhs).toEqual(9);

    a = 2;
    expect(lhs).toEqual(9); // but should be 16
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

  test('toRefs', () => {
    let props = {
      name: 'laptop',
      qty: 9
    };

    let propsAsRefs = toRefs(props);

    expect(propsAsRefs.name.value).toEqual('laptop');
    expect(propsAsRefs.qty.value).toEqual(9);

    // Destructuring works
    const { name } = propsAsRefs;
    expect(name.value).toEqual('laptop');

    // The ref and the original property is "linked"
    props.name = 'mobile';
    expect(name.value).toEqual('mobile');
  });
});

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
    expect(isRef(order)).toEqual(true);
    expect(total.value).toEqual(1450);

    // Change the item price
    // Re-computation will not happen due to shallow-ref
    order.value[1].price = 550;
    expect(total.value).toEqual(1450);

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
