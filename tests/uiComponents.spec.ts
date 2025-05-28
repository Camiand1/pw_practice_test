import {test, expect} from '@playwright/test';

test.describe('Form Layouts page', () => {
    test.describe.configure({retries: 0})

    test.beforeEach(async({page}) => {
        await page.goto('https://demo.applitools.com/');
    });
    
    test('Input Fields', async({page}, testInfo) => {
        if(testInfo.retry){
            // do something, like delete data or preparate some data
        }

        const usingGridEmailInput = page.locator('#username').getByRole('textbox', {name: "Enter your username"});
    
        await usingGridEmailInput.fill('test@test.com');
        await usingGridEmailInput.clear();
    
        await usingGridEmailInput.pressSequentially('test2@test.com', {delay: 2000});
    
        // Generic Asertion
        const inputValue = await usingGridEmailInput.inputValue();
        expect(inputValue).toEqual('test2@test.com');
    
        // Locator Assertion
        await expect(usingGridEmailInput).toHaveValue('test2@test.com');
    });
    

    test('radio buttons', async({page}) => {
        const usingGridEmailInput = page.locator('#username').getByRole('textbox', {name: "Enter your username"});
    
        await usingGridEmailInput.getByLabel('Option 1').check({force: true});
        await usingGridEmailInput.getByRole('radio', {name: "Option 1"}).check({force: true});
        const radioStatus = await usingGridEmailInput.getByRole('radio', {name: "Option 1"}).isChecked()
        //await expect(usingGridEmailInput).toHaveScreenshot({maxDiffPixels: 150});
        expect(radioStatus).toBeTruthy();
        
        await expect(usingGridEmailInput.getByRole('radio', {name: "Option 1"})).toBeChecked();

        await usingGridEmailInput.getByRole('radio', {name: "Option 2"}).check({force: true});
        expect( await usingGridEmailInput.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy();
        expect( await usingGridEmailInput.getByRole('radio', {name: "Option 1"}).isChecked()).toBeTruthy(); 
    });

});

test('checkboxes', async({page}) => {
    await page.getByRole('checkbox', {name: "Hide on click"}).check({force: true});
    await page.getByRole('checkbox', {name: "Hide on click2"}).uncheck({force: true});

    const allBoxes = page.getByRole('checkbox');
    for(const box of await allBoxes.all()){
        await box.check({force: true});
        expect(await box.isChecked()).toBeTruthy();
    }
});

test('lists and dropdowns', async({page}) => {
    const dropDwonMenu = page.locator('ngx-header nb-select');
    await dropDwonMenu.click();

    page.getByRole('list'); // when the list has a UL tag
    page.getByRole('listitem') // when the list has LI tag

    const optionList = page.getByRole('list').locator('nb-option');
    const optionList2 = page.locator('nb-option-list bn-option');
    await expect(optionList2).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);
    await optionList2.filter({hasText: "Cosmic"}).click();
    
    const header = page.locator('nb-layout-header');
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)');

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 50)",
        "Corporate": "rgb(255, 255, 255)"
    }

    await dropDwonMenu.click();
    for (const color in colors){
        await optionList2.filter({hasText: color}).click();
        await expect(header).toHaveCSS('background-color', colors[color]);
        if(color != "Corporate"){
            await dropDwonMenu.click();
        }
    }
});

test('tooltips', async({page}) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Tooltip').click();

    const toolTipCard = page.locator('nb-card', {hasText: "Tooltip Placements"});
    await toolTipCard.getByRole('button', {name: "Top"}).hover();

    page.getByRole('tooltip') // if you have a role tooltip created

    const toolTip2 = await page.locator('nb-tooltip').textContent();
    expect(toolTip2).toEqual('This is a tooltip');
});

test('Dialog boxes', async({page}) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart table').click();

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you watn to delete?');
        dialog.accept();
    });

    await page.getByRole('table').locator('tr', {hasText: "mdo@gmai.com"}).locator('.nb-trash').click();

    await expect(page.locator('table tr').first()).not.toHaveText('mdogmail.com');
});

test('web tables', async({page}) => {
    
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart table').click();

    //I get the row by any test in this row
    const tarteRow = page.getByRole('row', {name: "twitter@outlook.com"});
    await tarteRow.locator('-nb-edit').click();
    await page.locator('input-editor').getByPlaceholder('Age').clear();
    await page.locator('input-editor').getByPlaceholder('Age').fill('35');
    await page.locator('nb-checkmark').click();

    //2 get the row based on the value in the specific column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click();
    const targetRowById = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')});
    await targetRowById.click(); 
    await page.locator('input-editor').getByPlaceholder('E-mail').clear();
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com');
    await page.locator('nb-checkmark').click();

    await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com');

    //3 test filter of the table
    
    const ages = ["20", "30", "40", "200"];

    for( let age of ages){
    await page.locator('input-filter').getByPlaceholder('Age').clear();
    await page.locator('input-filter').getByPlaceholder('Age').fill(age);
    await page.waitForTimeout(500);
    const ageRows = page.locator('tbody tr');

        for( let row of await ageRows.all()){
            const cellValue = await row.locator('td').last().textContent();

            if(age == "200"){
                expect(await page.getByRole('table').textContent()).toContain('No data found');
            } else {
                expect(cellValue).toEqual(age);
            }
        }   
    }
});


// date picker
test('datepicker', async({page}) => {
  await page.getByText('Forms').click();
  await page.getByText('Datepicker').click();

  const calendarInputField = page.getByPlaceholder('Form Picker');
  await calendarInputField.click();

  let date= new Date();
  date.setDate(date.getDate()+1);
  const expectedDate = date.getDate().toString();
  const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'});
  const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'});
  const expectedYear = date.getFullYear();
  const dateToAssert = ´${expectedMonthShort} ${expectedDate}, ${expectedYear}´;

  let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
  const expectedMonthAndYear = ´ ${expectedMonthLong} ${expectedYear}´
  while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
    await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
    calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
  }

  await page.locator('[class="day-cell ng-star-inserte"]').getByText(expectedDate, {exact:true}).click();
  await expect(calendarInputField).toHaveValue(dateToAssert);
});

test('sliders', async({page}) => {
    //Update attribute
    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle');
    await tempGauge.evaluate( node => {
        node.setAttribute('cx', '232.630');
        node.setAttribute('cy', '232.630');
    });
    await tempGauge.click();

    //Mouse movement
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
    await tempBox.scrollIntoViewIfNeeded();

    const box = await tempBox.boundingBox();
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + 100, y);
    await page.mouse.move(x + 100, y + 100);
    await page.mouse.up();
    await expect(tempBox).toContainText('30');
});



