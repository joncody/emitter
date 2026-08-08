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
- 🛡️ **Prototype Safe**: Encapsulated event map built with `Object.create(null)`

---

## 📦 Installation

Copy `src/emitter.js` into your project and import it as an ES module:

```js
import emitter from './src/emitter.js';
```

---

## 🧠 Quick Examples

### Standalone Usage

```js
import emitter from "./src/emitter.js";

const bus = emitter();

bus.on("greet", function (name) {
    console.log("Hello, " + name + "!");
});

bus.emit("greet", "World"); // "Hello, World!"
```

### Mixin Usage (Adding events to objects)

```js
import emitter from "./src/emitter.js";

const user = { name: "Alice" };

// Upgrade 'user' to be an event emitter
const app_user = emitter(user);

app_user.on("login", function () {
    console.log(app_user.name + " has logged in.");
});

app_user.emit("login"); // "Alice has logged in."
```

---

## 📚 API Reference

### 🟢 Initialization

| Function | Description |
|----------|-------------|
| `emitter([target])` | Creates a new emitter, or adds emitter methods to the `target` object if provided. Returns the frozen instance. |

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
