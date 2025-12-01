# `emitter.js` – Lightweight Event Emitter

A tiny, robust implementation of the Observer pattern.

**emitter.js** provides a simple interface for subscribing to and emitting events. It works as a standalone event bus or as a **mixin** to add event capabilities to any existing object.

---

## ✅ Features

- 👂 **Standard API:** Familiar Node.js-style methods (`on`, `off`, `emit`, `once`)
- 🧬 **Mixin Support:** Can augment existing objects with event capabilities
- ⚡ **Meta Events:** Supports `newListener` and `removeListener` events for internal tracking
- 🔄 **Chainable:** Subscription methods return the instance for method chaining
- 📦 **Zero dependencies**, modern ES module

---

## 📦 Installation

Copy `emitter.js` into your project.

Import as a module:

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

// Upgrade 'user' to be an Emitter
emitter(user);

user.on("login", () => {
    console.log(`${user.name} has logged in.`);
});

user.emit("login"); // "Alice has logged in."
```

---

## 📚 API Reference

### 🟢 Initialization

| Function | Description |
|----------|-------------|
| `emitter([target])` | Creates a new emitter, or adds emitter methods to the `target` object if provided. |

**Properties:**
*   `em.emitter` – Boolean `true`.
*   `em.events` – Object containing the active listeners.

---

### 👂 Subscription

| Function | Description |
|----------|-------------|
| `on(type, listener)` | Adds a listener to the end of the listeners array for the specified event. |
| `addListener(type, listener)` | Alias for `on`. |
| `once(type, listener)` | Adds a **one-time** listener. The listener is invoked only the next time the event is fired, then removed. |

*Note: These methods return the emitter instance for chaining.*

---

### 🛑 Management

| Function | Description |
|----------|-------------|
| `off(type, listener)` | Removes the specified listener from the listener array for the specified event. |
| `removeListener(type, listener)` | Alias for `off`. |
| `removeAllListeners([type])` | Removes all listeners, or those of the specified `type`. |

---

### ⚡ Execution & Introspection

| Function | Description |
|----------|-------------|
| `emit(type, [...args])` | Synchronously calls each of the listeners registered for the event, passing the supplied arguments. Returns `true` if the event had listeners, `false` otherwise. |
| `listeners([type])` | Returns an array of listeners.<br>• If `type` is provided: returns the array of listeners for that specific event.<br>• If `type` is omitted: returns an array containing **all** listener arrays for every event. |

---

## 🔄 Meta Events

The emitter instance itself emits events during its own lifecycle:

*   **`newListener`**: Emitted *before* a listener is added.
    *   *Args:* `(event, listener)`
*   **`removeListener`**: Emitted *after* a listener is removed.
    *   *Args:* `(event, listener)`

---

## 📄 License

See the [LICENSE](./LICENSE) file for details.
