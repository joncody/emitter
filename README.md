# `emitter.js` – Lightweight Event Emitter

A tiny, robust implementation of the Observer pattern.

**`emitter.js`** provides a simple interface for subscribing to and emitting events. It works as a standalone event bus or as a **mixin** to add event capabilities to any existing extensible object.

> 📦 **Zero dependencies** • ⚡ **Chainable API** • 🌲 **Modern ES module**

---

## ✅ Features

- 👂 **Standard API**: Familiar Node.js-style methods (`on`, `off`, `emit`, `once`)
- 🧬 **Mixin Support**: Augment existing objects with event capabilities
- ⚡ **Meta Events**: Supports `newListener` and `removeListener` for introspection
- 🔄 **Chainable**: Subscription methods return the instance for fluent syntax
- 📦 **Tiny**: Under 1KB minified, fully tree-shakable

---

## 📦 Installation

Copy `emitter.js` into your project and import it as an ES module:

```js
import emitter from './emitter.js';
```

---

## 🧠 Quick Examples

### Standalone Usage

```js
import emitter from "./emitter.js";

const bus = emitter();

bus.on("greet", (name) => {
    console.log(`Hello, ${name}!`);
});

bus.emit("greet", "World"); // "Hello, World!"
```

### Mixin Usage (Adding events to objects)

```js
const user = { name: "Alice" };

// Upgrade 'user' to be an event emitter
emitter(user);

user.on("login", () => {
    console.log(`${user.name} has logged in.`);
});

user.emit("login"); // "Alice has logged in."
```

> ⚠️ **Note**: The target object must be **mutable and extensible**. Frozen, sealed, or non-writable objects will cause an error.

---

## 📚 API Reference

### 🟢 Initialization

| Function | Description |
|----------|-------------|
| `emitter([target])` | Creates a new emitter, or adds emitter methods to the `target` object if provided. Returns the (augmented) object. |

---

### 👂 Subscription

| Function | Description |
|----------|-------------|
| `on(type, listener)` | Adds a listener to the end of the listeners array for the event `type`. |
| `addListener(type, listener)` | Alias for `on`. |
| `once(type, listener)` | Adds a **one-time** listener. The listener is removed after its first invocation. |

> ✅ All subscription methods return the emitter instance for chaining.

---

### 🛑 Management

| Function | Description |
|----------|-------------|
| `off(type, listener)` | Removes the specified listener from the event `type`. |
| `removeListener(type, listener)` | Alias for `off`. |
| `removeAllListeners([type])` | Removes all listeners, or those of the specified `type` if provided. |

---

### ⚡ Execution & Introspection

| Function | Description |
|----------|-------------|
| `emit(type, [...args])` | Synchronously calls each listener for `type`, passing the supplied arguments. Returns `true` if listeners existed, `false` otherwise. |
| `listeners([type])` | Returns an array of listeners.<br>• With `type`: returns listeners for that event.<br>• Without `type`: returns a flat array of **all** registered listeners. |

---

## 🔄 Meta Events

The emitter can notify you about changes to its own listener registry:

- **`newListener`**: Emitted **before** a new listener is added.  
  _Arguments_: `(eventType, listenerFunction)`
- **`removeListener`**: Emitted **after** a listener is removed.  
  _Arguments_: `(eventType, listenerFunction)`

> 💡 **Important**: Meta events are **only triggered if a listener for that meta event is already registered**. For example, a `newListener` handler will **not** be notified about its own registration—it only sees future additions.

---

## 📄 License

See [LICENSE](./LICENSE)
