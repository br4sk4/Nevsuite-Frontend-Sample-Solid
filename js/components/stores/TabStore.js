import { createStore as createReduxStore } from 'redux';
import { TabActionTypes } from './TabActions';
import Tab from "./Tab";
import { v4 as uuid } from "uuid";

const initialState = {
    tabs: [
        {
            identifier: uuid(),
            label: "Home",
            tabtype: "HOME",
            selected: true,
            visible: true
        }
    ],
    visibilityIndex: 0,
    tabPagerLeftEnabled: false,
    tabPagerRightEnabled: false
};

const reduce = (state = initialState, action) => {
    let tabs = [];
    let visibilityIndex = 0;
    let tabPagerLeftEnabled = false;
    let tabPagerRightEnabled = false;

    switch (action.type) {
        case TabActionTypes.ADD_TAB:
            visibilityIndex = state.visibilityIndex;
            visibilityIndex = state.tabs.length - visibilityIndex > 4
                ? state.tabs.length - 4
                : visibilityIndex;

            tabPagerLeftEnabled = visibilityIndex > 0;
            tabPagerRightEnabled = visibilityIndex < tabs.length - 5;

            for (let i = 0; i < state.tabs.length; ++i) {
                tabs.push(new Tab(state.tabs[i].identifier, state.tabs[i].label, state.tabs[i].tabtype, false, i >= visibilityIndex && i < visibilityIndex + 5));
            }
            tabs.push(new Tab(action.tab.identifier, action.tab.label, action.tab.tabtype, true, tabs.length >= visibilityIndex));

            return {
                tabs: tabs,
                visibilityIndex: visibilityIndex,
                tabPagerLeftEnabled: tabPagerLeftEnabled,
                tabPagerRightEnabled: tabPagerRightEnabled
            };

        case TabActionTypes.REMOVE_TAB:
            let removedIndex = -1;

            visibilityIndex = state.visibilityIndex;
            if (visibilityIndex >= state.tabs.length - 1) visibilityIndex = state.tabs.length - 2;

            for (let i = 0; i < state.tabs.length; i++) {
                if (state.tabs[i].identifier !== action.tab.identifier) {
                    tabs.push(new Tab(state.tabs[i].identifier, state.tabs[i].label, state.tabs[i].tabtype, state.tabs[i].selected, i >= visibilityIndex && i < visibilityIndex + 5));
                } else if (action.tab.selected) {
                    removedIndex = i;
                }
            }

            if (removedIndex >= 0 && tabs.length > 0) {
                if (removedIndex === tabs.length) removedIndex--;
                tabs[removedIndex].selected = true;
            }

            tabPagerLeftEnabled = visibilityIndex > 0;
            tabPagerRightEnabled = visibilityIndex < tabs.length - 5;

            state = {
                tabs: tabs,
                visibilityIndex: visibilityIndex,
                tabPagerLeftEnabled: tabPagerLeftEnabled,
                tabPagerRightEnabled: tabPagerRightEnabled
            };
            return state;

        case TabActionTypes.SELECT_TAB:
            visibilityIndex = state.visibilityIndex;
            tabPagerLeftEnabled = state.tabPagerLeftEnabled;
            tabPagerRightEnabled = state.tabPagerRightEnabled;

            for (let i = 0; i < state.tabs.length; i++) {
                ( state.tabs[i].identifier === action.tab.identifier )
                    ? tabs.push(new Tab(state.tabs[i].identifier, state.tabs[i].label, state.tabs[i].tabtype, true, i >= visibilityIndex && i < visibilityIndex + 5))
                    : tabs.push(new Tab(state.tabs[i].identifier, state.tabs[i].label, state.tabs[i].tabtype, false, i >= visibilityIndex && i < visibilityIndex + 5));
            }

            state = {
                tabs: tabs,
                visibilityIndex: visibilityIndex,
                tabPagerLeftEnabled: tabPagerLeftEnabled,
                tabPagerRightEnabled: tabPagerRightEnabled
            };
            return state;

        case TabActionTypes.SCROLL_TABS_LEFT:
            visibilityIndex = state.visibilityIndex > 0 ? state.visibilityIndex - 1: state.visibilityIndex;

            for (let i = 0; i < state.tabs.length; ++i) {
                tabs.push(new Tab(state.tabs[i].identifier, state.tabs[i].label, state.tabs[i].tabtype, state.tabs[i].selected, i >= visibilityIndex && i < visibilityIndex + 5));
            }

            tabPagerLeftEnabled = visibilityIndex > 0;
            tabPagerRightEnabled = visibilityIndex < tabs.length - 5;

            state = {
                tabs: tabs,
                visibilityIndex: visibilityIndex,
                tabPagerLeftEnabled: tabPagerLeftEnabled,
                tabPagerRightEnabled: tabPagerRightEnabled
            }
            return state;

        case TabActionTypes.SCROLL_TABS_RIGHT:
            visibilityIndex = state.visibilityIndex <= state.tabs.length ? state.visibilityIndex + 1: state.visibilityIndex;

            for (let i = 0; i < state.tabs.length; ++i) {
                tabs.push(new Tab(state.tabs[i].identifier, state.tabs[i].label, state.tabs[i].tabtype, state.tabs[i].selected, i >= visibilityIndex && i < visibilityIndex + 5));
            }

            tabPagerLeftEnabled = visibilityIndex > 0;
            tabPagerRightEnabled = visibilityIndex < tabs.length - 5;

            state = {
                tabs: tabs,
                visibilityIndex: visibilityIndex,
                tabPagerLeftEnabled: tabPagerLeftEnabled,
                tabPagerRightEnabled: tabPagerRightEnabled
            }
            return state;

        default:
            return state;
    }
};

export default createReduxStore(reduce, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());