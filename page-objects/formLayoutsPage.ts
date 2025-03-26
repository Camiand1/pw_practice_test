import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutsPage extends HelperBase{

    constructor(page: Page){
        super(page)
    }


    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, firstName: string, gender: string){
        const usingGridForm = this.page.locator('.practice-form-wrapper', {hasText: "Practice Form"})
        await usingGridForm.getByPlaceholder('name@example.com').fill(email)
        await usingGridForm.getByPlaceholder('First Name').fill(firstName)
        await usingGridForm.getByRole('radio', {name: gender}).check({force:true})
        await usingGridForm.getByRole('button').click
    }

    /**
     *  This method will out the form with some user details
     * @param email - Description 
     * @param lastName - Description 
     * @param hobbies - Description
     */
    async submitInLineFormWithNameEmalAndCheckbox(email: string, lastName: string, hobbies: boolean){
        const usingGridForm = this.page.locator('.practice-form-wrapper', {hasText: "Practice Form"})
        await usingGridForm.getByRole('textbox', {name:"Last Name"}).fill(lastName)
        await usingGridForm.getByRole('textbox', {name:"name@example.com"}).fill(email)
        if(hobbies){
            await usingGridForm.getByRole('checkbox').check({force: true})
            await usingGridForm.getByRole('button').click
            
        }
    }
   
}