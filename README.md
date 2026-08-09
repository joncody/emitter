# `emitter.js` – Lightweight Event Emitter

A tiny, robust implementation of the Observer pattern.

**`emitter.js`** provides a simple interface for subscribing to and emitting events. It works as a standalone event bus or as a decorator/mixin factory to add event capabilities to target objects.

> 📦 **Zero dependencies** • ⚡ **Chainable API** • 🛡️ **Always Frozen** • 🌲 **Modern ES module**

---

## ✅ Features

- 👂 **Standard API**: Familiar Node.js-style methods (`on`, `off`, `emit`, `once`)
- 🧬 **Decorator Support**: Augment target objects with event capabilities in a new frozen instance
- 🔒 **Strict Immutability**: All returned instances are strictly frozen (`Object.freeze`)
- ⚡ **Meta Events**: Supports `newListener` and `removeListener` for introspection
- 🔄 **Chainable**: Subscription methods return the instance for fluent syntax
- 🛡️ **Prototype Safe**: Encapsulated event map built with `Object.create(null)`

---

## 📦 Installation

Copy `src/emitter.js` into your project and import it as an ES module:

```js
import emitter from "./src/emitter.js";
```

---

## 🧠 Quick Examples

### Standalone Usage

```js
import emitter from "./src/emitter.js";

// Creates an immutable, frozen standalone event bus
const bus = emitter();

bus.on("greet", function (name) {
    console.log("Hello, " + name + "!");
});

bus.emit("greet", "World"); // "Hello, World!"
```

### Decorator Usage (Decorating target objects)

```js
import emitter from "./src/emitter.js";

const user = { name: "Alice" };

// Decorate 'user' properties with emitter capabilities into a new frozen object
const userEmitter = emitter(user);

userEmitter.on("login", function () {
    console.log(userEmitter.name + " has logged in.");
});

userEmitter.emit("login"); // "Alice has logged in."
```

> 💡 **Immutability Note**: **All** objects returned by `emitter()` or `emitter(target)` are **always frozen** (`Object.freeze`). This guarantees that event emitter instances remain tamper-proof and robust against unexpected runtime mutations.

---

## 📚 API Reference

### 🟢 Initialization

| Function | Description |
|----------|-------------|
| `emitter([target])` | Returns a new **frozen** standalone emitter, or a new **frozen** composite object incorporating properties from `target` if provided. |

---

### 👂 Subscription

| Function | Description |
|----------|-------------|
| `on(type, listener)` | Adds a listener to the end of the listeners array for `type`. |
| `addListener(type, listener)` | Alias for `on`. |
| `once(type, listener)` | Adds a **one-time** listener. Removed after its first invocation. |

> ✅ All subscription methods return the emitter instance for chaining.

---

### 🛑 Management

| Function | Description |
|----------|-------------|
| `off(type, listener)` | Removes the specified listener from `type`. |
| `removeListener(type, listener)` | Alias for `off`. |
| `removeAllListeners([type])` | Removes all listeners, or those of `type` if provided. |

---

### ⚡ Execution & Introspection

| Function | Description |
|----------|-------------|
| `emit(type, [...args])` | Synchronously calls each listener for `type`. Returns `true` if listeners existed, `false` otherwise. |
| `listeners([type])` | Returns an array of listeners.<br>• With `type`: returns listeners for that event.<br>• Without `type`: returns a flat array of **all** registered listeners. |

---

## 🧪 Testing

This library includes a zero-dependency, comprehensive browser-based verification suite covering 100% of methods, meta-events, and prototype boundary guards.

To run the test suite:

1. Serve the repository using any static web server (e.g., Nginx, Caddy, or Python's `http.server`).
2. Open `tests/index.html` in your browser (e.g., `http://localhost/tests/index.html`).
3. View results visually on the page or open Developer Tools (`F12` -> **Console**) to inspect grouped log outputs and execution metrics.

---

## 📄 License

See [LICENSE](./LICENSE) for details.
