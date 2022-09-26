import Tab from "./stores/Tab";
import TabHeading from "./TabHeading";
import { For } from "solid-js";
import { createTabStore } from "./stores/StoreFactory";
import { v4 as uuid } from "uuid";

function TabLaneSpacer() {
    const [store, { addTab, scrollTabsLeft, scrollTabsRight }] = createTabStore();

    const scrollLeftButton = {
        style: () => { return "tabPagerButtonLeft fa-solid fa-angle-left" + (!store.tabPagerLeftEnabled ? " disabled" : "") },
        onClick: () => { if (store.tabPagerLeftEnabled) scrollTabsLeft() }
    }

    const scrollRightButton = {
        style: () => { return "tabPagerButtonRight fa-solid fa-angle-right" + (!store.tabPagerRightEnabled ? " disabled" : "") },
        onClick: () => {if (store.tabPagerRightEnabled) scrollTabsRight()}
    }

    const addTabButton = {
        style: () => { return "tabPagerButtonPlus fa-solid fa-plus" },
        onClick: () => { addTab(new Tab(uuid(), "Tab", "EMPTY", true, false)) }
    }

    return (
        <div class="tabPager">
            <div class={scrollLeftButton.style()} onClick={() => scrollLeftButton.onClick()} />
            <div class={scrollRightButton.style()} onClick={() => scrollRightButton.onClick()} />
            <div class={addTabButton.style()} onClick={() => addTabButton.onClick()} />
            <For each={store.tabs}>
                {(tab) =>
                    <TabHeading tab={tab} />
                }
            </For>
        </div>
    );
}

export default TabLaneSpacer;