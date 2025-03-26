import {test, expect} from '@playwright/test';



    test('Input Fields', async({page}, testInfo) => {

        
        await page.goto('https://demo.applitools.com/');
        if(testInfo.project.name == 'mobile'){
            await page.locator('.sidebar-toogle').click()
        }
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        if(testInfo.project.name == 'mobile'){
            await page.locator('.sidebar-toogle').click()
        }
        const usingGridEmailInput = page.locator('#username').getByRole('textbox', {name: "Enter your username"});
        await usingGridEmailInput.fill('test@test.com');
        await usingGridEmailInput.clear();
    
        await usingGridEmailInput.pressSequentially('test2@test.com', {delay: 2000});
    
    });
    
