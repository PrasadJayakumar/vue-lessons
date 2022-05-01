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
      user: {
        id: 1000,
        name: 'Tony Stark'
      },
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

  test('trigger', () => {
    //
    let triggeredBy;

    //
    let total = computed(
      () =>
        state.order.reduce(
          (subTotal, item) => subTotal + item.qty * item.price,
          0
        ),
      {
        onTrigger(e) {
          debugger;
          triggeredBy = {
            key: e.key,
            type: e.type,
            newValue: e.newValue,
            oldValue: e.oldValue
          };
        }
      }
    );
    expect(total.value).toEqual(1450);

    // Change the order quantity
    triggeredBy = {};
    state.order[0].qty = 2;
    expect(triggeredBy).toMatchSnapshot();

    // Add one more item to the Order
    triggeredBy = {};
    state.order.push({ id: 102, name: 'keyboard', qty: 1, price: 50 });
    expect(triggeredBy).toMatchSnapshot();

    // Change the value of user and
    // verify if total is re-computed
    triggeredBy = {};
    state.user.name = 'Peter Parker';
    expect(triggeredBy).toMatchSnapshot();
  });

  test('gone-wrong', () => {
    // Destructuring works, but handle with care
    let { user } = state;
    expect(isReactive(user)).toEqual(true);

    // Copy the properties
    const blackPanther = { id: 1001, name: "T'Challa" };
    Object.assign(user, blackPanther);
    expect(state.user).toEqual(user);

    // The user and the original state.user is NOT "linked" anymore
    const spiderMan = { id: 1002, name: 'Peter Parker' };
    user = spiderMan;
    expect(state.user).not.toEqual(user);
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
