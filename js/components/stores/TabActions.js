export const TabActionTypes = {
    ADD_TAB: 'ADD_TAB',
    REMOVE_TAB: 'REMOVE_TAB',
    SELECT_TAB: 'SELECT_TAB',
    SCROLL_TABS_LEFT: 'SELECT_TABS_LEFT',
    SCROLL_TABS_RIGHT: 'SCROLL_TABS_RIGHT',
};

export default {
    addTab: tab => ({type: TabActionTypes.ADD_TAB, tab: tab}),
    selectTab: tab => ({type: TabActionTypes.SELECT_TAB, tab: tab}),
    removeTab: tab => ({type: TabActionTypes.REMOVE_TAB, tab: tab}),
    scrollTabsLeft: () => ({type: TabActionTypes.SCROLL_TABS_LEFT}),
    scrollTabsRight: () => ({type: TabActionTypes.SCROLL_TABS_RIGHT})
};