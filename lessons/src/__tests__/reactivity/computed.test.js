import { beforeEach, describe, expect } from 'vitest';
import { reactive, computed, toRaw, triggerRef } from 'vue';

describe('computed', () => {
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

  test('trigger', () => {
    let triggeredBy;

    const total = computed(
      () =>
        state.order.reduce(
          (subTotal, item) => subTotal + item.qty * item.price,
          0
        ),
      {
        onTrigger(e) {
          triggeredBy = { key: e.key, type: e.type };
        }
      }
    );

    // call atleast once
    expect(total.value).toEqual(1450);

    // change the order quantity
    state.order[0].qty = 2;
    expect(triggeredBy).toEqual({ key: 'qty', type: 'set' });
    expect(total.value).toEqual(2450);

    // add one more item to the Order
    state.order.push({ id: 102, name: 'keyboard', qty: 1, price: 50 });
    expect(triggeredBy).toEqual({ key: '2', type: 'add' });
    expect(total.value).toEqual(2500);

    // change the value of user and
    // verify if total is re-computed
    triggeredBy = null;
    state.user.name = 'Peter Parker';
    expect(triggeredBy).toBeNull;
  });

  test('skip-trigger', () => {
    const total = computed(() =>
      state.order.reduce(
        (subTotal, item) => subTotal + item.qty * item.price,
        0
      )
    );

    // call atleast once
    expect(total.value).toEqual(1450);

    // https://vuejs.org/api/reactivity-advanced.html#toraw

    // This is an escape hatch that can be used to temporarily read without
    // incurring proxy access / tracking overhead or write without triggering
    // changes.

    // It is not recommended to hold a persistent reference to the original object.
    // Use with caution.
    const order = toRaw(state.order);
    order.push({ id: 102, name: 'keyboard', qty: 1, price: 50 });
    expect(total.value).not.toEqual(1500);

    // continue business as usual
    state.order[0].qty = 2;
    expect(total.value).toEqual(2500);
  });
});
