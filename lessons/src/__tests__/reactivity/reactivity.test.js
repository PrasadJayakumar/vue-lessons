import { describe, expect } from 'vitest';
import { ref, isRef, reactive, isReactive, toRefs, computed } from 'vue';

describe('reactivity', () => {
  const getOrder = () => [
    { id: 100, name: 'laptop', qty: 1, price: 1000 },
    { id: 101, name: 'mobile', qty: 1, price: 450 }
  ];

  test('ref-on-primitive-type', () => {
    let a = ref(1);
    let b = ref(2);

    expect(isRef(a)).toEqual(true);

    const lhs = computed(() => (a.value + b.value) ** 2);
    expect(lhs.value).toEqual(9);

    a.value = 2;
    expect(lhs.value).toEqual(16);
  });

  test('reactive-on-object-type', () => {
    const order = reactive(getOrder());

    // reactive is deep
    expect(isReactive(order)).toEqual(true);
    expect(isReactive(order[0])).toEqual(true);
    expect(isReactive(order[0].price)).toEqual(false);

    const total = computed(() =>
      order.reduce((subTotal, item) => subTotal + item.qty * item.price, 0)
    );
    expect(total.value).toEqual(1450);

    order[0].qty = 2;
    expect(total.value).toEqual(2450);
  });

  test('ref-on-object-type', () => {
    // References
    // https://github.com/vuejs/core/blob/main/packages/reactivity/src/ref.ts
    // https://github.com/vuejs/core/blob/main/packages/reactivity/src/reactive.ts

    // ref on object creates reactive object
    const order = ref(getOrder());
    expect(isRef(order)).toEqual(true);

    // reactive is deep
    expect(isReactive(order.value)).toEqual(true);
    expect(isReactive(order.value[0])).toEqual(true);
    expect(isReactive(order.value[0].price)).toEqual(false);

    const total = computed(() =>
      order.value.reduce(
        (subTotal, item) => subTotal + item.qty * item.price,
        0
      )
    );
    expect(total.value).toEqual(1450);

    order.value[0].qty = 2;
    expect(total.value).toEqual(2450);
  });

  test('toRefs', () => {
    const state = reactive({
      order: getOrder(),
      user: { id: 1000, name: 'Tony Stark' },
      vouchers: new Set(['deep-discount', 'only-today'])
    });

    let stateAsRefs = toRefs(state);

    // Destructuring works
    const { user } = stateAsRefs;
    expect(isRef(stateAsRefs.user)).toEqual(true);
    expect(isRef(user)).toEqual(true);

    // The ref and the original property is "linked"
    expect(user.value).toEqual(state.user);

    const spiderMan = { id: 1001, name: 'Peter Parker' };
    user.value = spiderMan;
    expect(user.value).toEqual(state.user);
  });
});
