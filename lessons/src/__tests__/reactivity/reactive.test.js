import { beforeEach, describe, expect } from 'vitest';
import { reactive, isReactive, toRefs, isRef, computed } from 'vue';

describe('reactive', () => {
  let state;

  beforeEach(() => {
    state = reactive({
      order: [
        { id: 100, name: 'laptop', qty: 1, price: 1000 },
        { id: 101, name: 'mobile', qty: 1, price: 450 }
      ],
      user: { id: 1000, name: 'Tony Stark' },
      vouchers: new Set(['deep-discount', 'only-today'])
    });
  });

  test('basics', () => {
    // state is deeply reactive
    expect(isReactive(state)).toEqual(true);
    expect(isReactive(state.order)).toEqual(true);
    expect(isReactive(state.order[0])).toEqual(true);
    expect(isReactive(state.order[0].id)).toEqual(false);

    expect(isReactive(state.user)).toEqual(true);
    expect(isReactive(state.user.id)).toEqual(false);

    expect(isReactive(state.vouchers)).toEqual(true);

    //
    let total = computed(() =>
      state.order.reduce(
        (subTotal, item) => subTotal + item.qty * item.price,
        0
      )
    );

    expect(total.value).toEqual(1450);
    state.order[0].qty = 2;
    expect(total.value).toEqual(2450);
  });

  test('toRefs', () => {
    let stateAsRefs = toRefs(state);

    // Destructuring works
    const { user } = stateAsRefs;
    expect(isRef(stateAsRefs.user)).toEqual(true);
    expect(isRef(user)).toEqual(true);

    // The ref and the original property is "linked"
    expect(user.value).toEqual({ id: 1000, name: 'Tony Stark' });

    const spiderMan = { id: 1001, name: 'Peter Parker' };
    user.value = spiderMan;
    expect(state.user).toEqual(user.value);
  });
});
