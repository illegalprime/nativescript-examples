import ui = require("ui/core/view");

import {SearchBar} from "ui/search-bar";
import {AbsoluteLayout} from "ui/layouts/absolute-layout";
import {View} from "ui/core/view";
import {Page} from "ui/page";
import {WebView} from "ui/web-view";
import {Color} from "color";

export function pageLoaded(args) {
    console.log("Page loaded");
    const root: Page = args.object;
    const tabs_container = <AbsoluteLayout> ui.getViewById(root, "tabs-container");
    tabs_container.backgroundColor = new Color("blue");
    // tabs_container.width = 100;
    // tabs_container.height = 100;

    const manager = new ViewManager(tabs_container);

    const homepage = new WebView();
    homepage.url = "http://www.crouton.net/";
    homepage.backgroundColor = new Color("#00000000");

    manager.push(homepage);
}

export function search_bar_loaded(args) {
    console.log("search bar loaded");
    const search_bar: SearchBar = args.object;
    search_bar.on(SearchBar.submitEvent, (event) => {
        console.log("submitted");
    });
}

export class ViewManager {
    private layout: AbsoluteLayout;

    constructor(layout: AbsoluteLayout) {
        this.layout = layout;
    }

    push(view: View) {
        this.maximize(view);
        console.log("LAYOUT DIMENSIONS", this.layout.width, this.layout.height);
        this.layout.addChild(view);
    }

    private maximize(view: View) {
        AbsoluteLayout.setTop(view, 0);
        AbsoluteLayout.setLeft(view, 0);
        view.height = this.layout.height;
        view.width = this.layout.width;
    }
}
