import { onCleanup } from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import TabStore from "./TabStore"
import TabActions from "./TabActions"

export function createTabStore() {
    return useRedux(TabStore, TabActions);
}

function useRedux(store, actions) {
    const [state, setState] = createStore(store.getState());
    const unsubscribe = store.subscribe(
        () => setState(reconcile(store.getState()))
    );
    onCleanup(() => unsubscribe());
    return [
        state,
        mapActions(store, actions)
    ];
}

function mapActions(store, actions) {
    const mapped = {};
    for (const key in actions) {
        mapped[key] = (...args) => store.dispatch(actions[key](...args));
    }
    return mapped;
}