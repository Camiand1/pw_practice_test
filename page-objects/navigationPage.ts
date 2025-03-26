import { Page } from "@playwright/test";
import exp from "constants";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {

    constructor(page: Page){
        super(page)
    }

    async formLayoutsPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Practice Form').click()
        await this.waitForNumberOfSeconds(2)
    }

    async datePickerPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.waitForTimeout(1000)
        await this.page.locator('#dateOfBirthInput').click()
    
    }

    async browserWindowsPage(){
        await this.selectGroupMenuItem('Alerts, Frame & Windows')
        await this.page.getByText('Browser Windows').click()
    }

    async alertsPage(){
        await this.selectGroupMenuItem('Alerts, Frame & Windows')
        await this.page.getByText('Alerts').click()
    }

    async framesPage(){
        await this.selectGroupMenuItem('Alerts, Frame & Windows')
        await this.page.getByText('Frames').click()
    }

    async widgetsDatePickerPage(){
        await this.selectGroupMenuItem('Widgets')
        await this.page.getByText('Date Picker').click()
    }


    private async selectGroupMenuItem(groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if(expandedState == "false"){
            await groupMenuItem.click()
        }
    }
}