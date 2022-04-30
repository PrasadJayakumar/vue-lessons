# Points to Remember

## Reactivity Fundamentals
- Vue buffers "Dom updates" until the "next tick" in the update cycle to ensure that each component needs to update only once no matter how many state changes you have made. [Learn more](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#dom-update-timing)
- Calling reactive() on the same object always returns the same proxy.
- Calling reactive() on an existing proxy also returns that same proxy. [Learn more](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#reactive-proxy-vs-original-1)

## Computed Properties
- Computed properties are cached based on their reactive dependencies. A computed property will only re-evaluate when some of its reactive dependencies have changed.  [Learn more](https://vuejs.org/guide/essentials/computed.html#computed-caching-vs-methods)  
- Computed getter functions should only perform pure computation and be free of side effects.
- Avoid mutating computed value. [Learn more](https://vuejs.org/guide/essentials/computed.html#best-practices)

---

# Points to Remember - Contd.

## Class and Style Bindings
- **:class** directive can also co-exist with the plain **class** attribute.
- When you use the class attribute on a component with a single root element, those classes will be added to the component's root element, and merged with any existing class already on it.

## List Rendering
- It is recommended to provide a key attribute with v-for whenever possible, unless the iterated DOM content is simple (i.e. contains no components or stateful DOM elements), or you are intentionally relying on the default behavior for performance gains.

---

# Points to Remember - Contd.

## watch vs watchEffect
- **watch** separates dependency tracking from the side effect, giving us more precise control over when the callback should fire.
- **watchEffect**, on the other hand, combines dependency tracking and side effect into one phase. [Learn more](https://vuejs.org/guide/essentials/watchers.html#watch-vs-watcheffect)

## Stopping a watch
- If the watcher is created in an async callback, it won't be bound to the owner component and must be stopped manually to avoid memory leaks

---

# Points to Remember - Contd.

## Fallthrough Attributes
- The $attrs object includes all attributes that are not declared by the component's props or emits options (e.g., class, style, v-on listeners, etc.).

## Renderless Components
- [Learn more](https://vuejs.org/guide/components/slots.html#renderless-components)