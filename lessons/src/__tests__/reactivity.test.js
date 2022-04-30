import { expect } from 'vitest';
import { ref, computed, isRef, toRefs } from 'vue';

describe('ref', () => {
  test('non-reactive', () => {
    let a = 1;
    let b = 2;

    const lhs = (a + b) ** 2;
    expect(lhs).toEqual(9);

    a = 2;
    expect(lhs).toEqual(9); // but should be 16
  });

  test('basics', () => {
    let a = ref(1);
    let b = ref(2);

    expect(isRef(a)).toEqual(true);

    const lhs = computed(() => (a.value + b.value) ** 2);
    expect(lhs.value).toEqual(9);

    a.value = 2;
    expect(lhs.value).toEqual(16);
  });

  test('toRefs', () => {
    let props = {
      name: 'laptop',
      qty: 9
    };

    let propsRefs = toRefs(props);

    expect(propsRefs.name.value).toEqual('laptop');
    expect(propsRefs.qty.value).toEqual(9);

    // Destructuring works
    const { name } = propsRefs;
    expect(name.value).toEqual('laptop');

    // The ref and the original property is "linked"
    props.name = 'mobile';
    expect(name.value).toEqual('mobile');
  });
});
