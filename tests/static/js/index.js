import emitter from "../../../src/emitter.js";

function create_test_runner() {
    const results_container = document.getElementById("test-results");
    const summary_container = document.getElementById("summary");

    let total_assertions = 0;
    let passed_assertions = 0;
    let failed_assertions = 0;
    let current_group_body = null;

    function group(title) {
        if (current_group_body !== null) {
            console.groupEnd();
        }
        console.group(title);

        const group_el = document.createElement("div");
        group_el.className = "test-group";

        const header_el = document.createElement("div");
        header_el.className = "group-header";
        header_el.textContent = title;

        current_group_body = document.createElement("div");
        current_group_body.className = "group-body";

        group_el.appendChild(header_el);
        group_el.appendChild(current_group_body);
        results_container.appendChild(group_el);
    }

    function assert(condition, message) {
        total_assertions += 1;
        const entry = document.createElement("div");

        if (Boolean(condition) === true) {
            passed_assertions += 1;
            entry.className = "log-entry pass";
            entry.textContent = "[PASS] " + message;
            console.log("[PASS] " + message);
        } else {
            failed_assertions += 1;
            entry.className = "log-entry fail";
            entry.textContent = "[FAIL] " + message;
            console.error("[FAIL] " + message);
        }

        if (current_group_body !== null) {
            current_group_body.appendChild(entry);
        }
    }

    function assert_throws(fn, error_type, message) {
        try {
            fn();
            assert(
                false,
                message + " (Expected " + error_type.name + ")"
            );
        } catch (err) {
            if (err.constructor === error_type) {
                assert(
                    true,
                    message + " (Caught expected " + error_type.name + ")"
                );
            } else {
                assert(
                    false,
                    message + " (Caught unexpected error type)"
                );
            }
        }
    }

    function render_summary(start_time) {
        const elapsed = performance.now() - start_time;
        const duration = Math.round(elapsed * 100) / 100;
        let status_class = "summary-fail";

        if (failed_assertions === 0) {
            status_class = "summary-pass";
        }

        if (current_group_body !== null) {
            console.groupEnd();
        }

        const summary_text = (
            "Total Assertions: " +
            total_assertions +
            " | Passed: " +
            passed_assertions +
            " | Failed: " +
            failed_assertions +
            " | Execution Time: " +
            duration +
            " ms"
        );

        console.info(summary_text);

        summary_container.innerHTML = (
            "Total Assertions: <strong>" +
            total_assertions +
            "</strong> | Passed: <span class='" +
            status_class +
            "'>" +
            passed_assertions +
            "</span> | Failed: <span class='" +
            status_class +
            "'>" +
            failed_assertions +
            "</span> | Execution Time: <strong>" +
            duration +
            " ms</strong>"
        );
    }

    return Object.freeze({
        assert,
        assert_throws,
        group,
        render_summary
    });
}

// =============================================================================
// Test Suite Execution
// =============================================================================

function run_all_tests() {
    const runner = create_test_runner();
    const start_time = performance.now();

    // -------------------------------------------------------------------------
    // GROUP 1: Factory & Mixin Instantiation
    // -------------------------------------------------------------------------
    runner.group("1. Factory & Mixin Instantiation");

    const bus = emitter();
    runner.assert(
        typeof bus.on === "function",
        "Factory creates emitter with .on() method"
    );
    runner.assert(
        Object.isFrozen(bus) === true,
        "Returned emitter instance is frozen"
    );

    const target = {
        name: "Alice"
    };
    const mixed = emitter(target);
    runner.assert(
        mixed.name === "Alice",
        "Mixin preserves target properties"
    );
    runner.assert(
        typeof mixed.on === "function",
        "Mixin attaches emitter methods"
    );
    // Verify target extensibility
    mixed.role = "admin";
    runner.assert(
        mixed.role === "admin",
        "Extended target remains extensible for application property additions"
    );

    // -------------------------------------------------------------------------
    // GROUP 2: Event Subscriptions & Emission
    // -------------------------------------------------------------------------
    runner.group("2. Event Subscriptions & Emission");

    const bus2 = emitter();
    let received_val = null;
    let call_count = 0;

    function handle_greet(msg) {
        received_val = msg;
        call_count += 1;
    }

    bus2.on("greet", handle_greet);
    const emit_result = bus2.emit("greet", "Hello World");

    runner.assert(
        emit_result === true,
        "emit() returns true when listeners exist"
    );
    runner.assert(
        received_val === "Hello World",
        "Listener receives emitted argument"
    );
    runner.assert(
        call_count === 1,
        "Listener invoked exactly once"
    );

    const empty_emit = bus2.emit("unknown");
    runner.assert(
        empty_emit === false,
        "emit() returns false when no listeners exist"
    );

    // -------------------------------------------------------------------------
    // GROUP 3: One-time Listeners (once)
    // -------------------------------------------------------------------------
    runner.group("3. One-time Listeners (once)");

    const bus3 = emitter();
    let once_count = 0;

    bus3.once("ping", function () {
        once_count += 1;
    });

    bus3.emit("ping");
    bus3.emit("ping");

    runner.assert(
        once_count === 1,
        "once() listener executes only once across multiple emissions"
    );
    runner.assert(
        bus3.listeners("ping").length === 0,
        "once() listener automatically removed from registry"
    );

    // -------------------------------------------------------------------------
    // GROUP 4: Listener Removal (off / removeListener / removeAllListeners)
    // -------------------------------------------------------------------------
    runner.group("4. Listener Removal");

    const bus4 = emitter();
    let count_a = 0;
    let count_b = 0;

    function handler_a() {
        count_a += 1;
    }

    function handler_b() {
        count_b += 1;
    }

    bus4.on("data", handler_a);
    bus4.on("data", handler_b);
    bus4.off("data", handler_a);

    bus4.emit("data");

    runner.assert(
        count_a === 0,
        "off() successfully removes specific listener"
    );
    runner.assert(
        count_b === 1,
        "Other listeners remain registered after off()"
    );

    bus4.removeAllListeners("data");
    runner.assert(
        bus4.listeners("data").length === 0,
        "removeAllListeners('type') clears all listeners for event type"
    );

    bus4.on("x", handler_a);
    bus4.on("y", handler_b);
    bus4.removeAllListeners();
    runner.assert(
        bus4.listeners().length === 0,
        "removeAllListeners() without arguments clears all event types"
    );

    // -------------------------------------------------------------------------
    // GROUP 5: Meta Events (newListener & removeListener)
    // -------------------------------------------------------------------------
    runner.group("5. Meta Events (newListener & removeListener)");

    const bus5 = emitter();
    let new_type = null;
    let new_fn = null;
    let rem_type = null;
    let rem_fn = null;

    function on_new(type, fn) {
        new_type = type;
        new_fn = fn;
    }

    function on_rem(type, fn) {
        rem_type = type;
        rem_fn = fn;
    }

    bus5.on("newListener", on_new);
    bus5.on("removeListener", on_rem);

    function sample_handler() {
        return undefined;
    }

    bus5.on("test", sample_handler);

    runner.assert(
        new_type === "test",
        "newListener meta-event receives event type name"
    );
    runner.assert(
        new_fn === sample_handler,
        "newListener meta-event receives added listener function"
    );

    bus5.off("test", sample_handler);

    runner.assert(
        rem_type === "test",
        "removeListener meta-event receives event type name"
    );
    runner.assert(
        rem_fn === sample_handler,
        "removeListener meta-event receives removed listener function"
    );

    // -------------------------------------------------------------------------
    // GROUP 6: Listener Introspection & Encapsulation
    // -------------------------------------------------------------------------
    runner.group("6. Listener Introspection & Encapsulation");

    const bus6 = emitter();

    function dummy_fn() {
        return undefined;
    }

    bus6.on("evt1", dummy_fn);
    bus6.once("evt2", dummy_fn);

    const list_evt1 = bus6.listeners("evt1");
    runner.assert(
        list_evt1.length === 1 && list_evt1[0] === dummy_fn,
        "listeners('type') returns registered function"
    );

    const list_evt2 = bus6.listeners("evt2");
    runner.assert(
        list_evt2.length === 1 && list_evt2[0] === dummy_fn,
        "listeners('type') unwraps once() handler to return raw function"
    );

    const all_list = bus6.listeners();
    runner.assert(
        all_list.length === 2,
        "listeners() without arguments returns flat array of all listeners"
    );

    list_evt1.push(function () {
        return undefined;
    });
    runner.assert(
        bus6.listeners("evt1").length === 1,
        "Mutating returned array does not leak into internal private state"
    );

    // -------------------------------------------------------------------------
    // GROUP 7: Prototype Safety & Boundary Guards
    // -------------------------------------------------------------------------
    runner.group("7. Prototype Safety & Boundary Guards");

    const bus7 = emitter();
    let proto_called = false;

    bus7.on("toString", function () {
        proto_called = true;
    });

    bus7.emit("toString");
    runner.assert(
        proto_called === true,
        "Event matching Object.prototype property ('toString') works safely"
    );

    bus7.on(123, function () {
        return undefined;
    });
    runner.assert(
        bus7.listeners(123).length === 0,
        "Non-string event type is safely ignored by on()"
    );

    bus7.on("valid", "not a function");
    runner.assert(
        bus7.listeners("valid").length === 0,
        "Non-function listener is safely ignored by on()"
    );

    runner.render_summary(start_time);
}

run_all_tests();
