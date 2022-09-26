import {createTabStore} from "./stores/StoreFactory";
import {Show} from "solid-js";

function TabHeading(props) {
    const [store, { selectTab, removeTab }] = createTabStore();

    let tabHeadingStyle = props.tab.selected ? "tabHeading active" : "tabHeading";
    let removeButtonStyle = "tabRemoveButton fa-solid fa-xmark";
    let tabHeadingLabelStyle = 'tabHeadingLabel';

    return (
        <Show when={props.tab.visible}>
            <div class={tabHeadingStyle}>
                <div class={tabHeadingLabelStyle} onClick={() => selectTab(props.tab)}>
                    <label>{props.tab.label}</label>
                </div>
                <div class={removeButtonStyle} onClick={() => removeTab(props.tab)} />
            </div>
        </Show>
    );
}

export default TabHeading;