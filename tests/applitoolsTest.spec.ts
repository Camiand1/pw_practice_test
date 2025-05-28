import {test, expect} from '@playwright/test';


test('Applitools Test', async({page}) => {
    await page.goto('https://demoglobalsqa.com/automation-practice-form');

    await page.getByText('Form Layouts').click();
    await page.getByText('Using the Grid').click();

});