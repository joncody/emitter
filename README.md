# Emitter - EventEmitter Implementation

The `emitter` function implements an event emitter that can be used for managing event listeners and emitting events. It provides functionality similar to Node.js EventEmitter, allowing you to add, remove, and emit events.

## Features

- **Add and remove event listeners** for different event types.
- **Emit events** to notify all listeners of a specific type.
- Support for **one-time event listeners** (`once` method).
- Allows **removal of specific listeners** or **all listeners** for a particular event type.
- Supports **newListener** and **removeListener** events for monitoring listener changes.

## Installation

Import it into your JavaScript:

```javascript
import emitter from 'emitter';
```

## Example Usage

Here’s an example of how to use the `emitter` function to manage events:

### Create an emitter and add event listeners:

```javascript
import emitter from 'emitter';

const em = emitter();

// Event listener function
function onMessageReceived(msg) {
    console.log('Message received:', msg);
}

// Add a listener for the 'message' event
em.on('message', onMessageReceived);

// Emit the 'message' event with a message as argument
em.emit('message', 'Hello, world!'); // Output: Message received: Hello, world!
```

### Add a one-time listener (`once`):

```javascript
// Add a one-time listener for 'onceMessage' event
em.once('onceMessage', (msg) => {
    console.log('One-time message:', msg);
});

// Emit 'onceMessage' event
em.emit('onceMessage', 'This will be logged once'); // Output: One-time message: This will be logged once

// Emitting again won't trigger the listener
em.emit('onceMessage', 'This will not be logged');
```

### Remove a specific listener:

```javascript
// Remove the 'onMessageReceived' listener from 'message' event
em.removeListener('message', onMessageReceived);

// Emit the 'message' event after removing the listener
em.emit('message', 'This will not be logged'); // No output
```

### Remove all listeners for a specific event:

```javascript
// Remove all listeners for the 'message' event
em.removeAllListeners('message');

// Emit the 'message' event after removing all listeners
em.emit('message', 'No listeners left'); // No output
```

## API Documentation

### `em.addListener(type, listener)`
Adds a listener to a specific event type.

#### Parameters:
- **`type`** (string): The event type (e.g., `'message'`).
- **`listener`** (function): The listener function to be added.

#### Returns:
- The emitter instance (`em`).

---

### `em.on(type, listener)`
Alias for `addListener`.

---

### `em.once(type, listener)`
Adds a one-time listener to a specific event type. The listener is invoked at most once.

#### Parameters:
- **`type`** (string): The event type.
- **`listener`** (function): The listener function to be added.

#### Returns:
- The emitter instance (`em`).

---

### `em.removeListener(type, listener)`
Removes a specific listener for a given event type.

#### Parameters:
- **`type`** (string): The event type.
- **`listener`** (function): The listener function to be removed.

#### Returns:
- The emitter instance (`em`).

---

### `em.off(type, listener)`
Alias for `removeListener`.

---

### `em.removeAllListeners([type])`
Removes all listeners for a specific event type or all events if no type is provided.

#### Parameters:
- **`type`** (string, optional): The event type. If omitted, all event listeners are removed.

#### Returns:
- The emitter instance (`em`).

---

### `em.listeners(type)`
Returns an array of listeners for a specific event type.

#### Parameters:
- **`type`** (string): The event type.

#### Returns:
- An array of listener functions.

---

### `em.emit(type, [...args])`
Emits an event of the specified type, calling all registered listeners with the provided arguments.

#### Parameters:
- **`type`** (string): The event type.
- **`args`** (array): Arguments to pass to the listener functions.

#### Returns:
- `true` if the event was emitted (i.e., at least one listener was called), otherwise `false`.

---

## License

See the [LICENSE](./LICENSE) file for details.
