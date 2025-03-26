import {test, expect} from '@playwright/test';


test.beforeEach(async({page}, testInfo) => {  
    await page.goto(process.env.URL);
    await page.getByText('Button Triggering AJAX Request').click();
    testInfo.setTimeout(testInfo.timeout + 10000);
  });

test('Auto waiting', async({page}) => {
    const successBtn = page.locator('.bg-success');

    //await successBtn.click();

    const text = await successBtn.textContent();
    expect(text).toEqual('Data loaded with AJAX get request.'); 

    
    const text2 = await successBtn.allTextContents();
    await successBtn.waitFor({state: "attached"});
    expect(text2).toContain('Data loaded with AJAX get request.'); 

    await expect(successBtn).toHaveText('Data loaded with AJAX get request.', {timeout: 20000});
}),

test('Alternative Waits', async({page}) => {
    const successBtn = page.locator('.bg-success');

    //_____Wait for element
    await page.waitForSelector('.bg-success')

    //____ wait for particular response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata') //networking response

    //_____ Wait for network calls to be completed ('NOT RECOMMENDED')
    await page.waitForLoadState('networkidle');

    await page.waitForTimeout(5000);

    const text = await successBtn.allTextContents();
    expect(text).toContain('Data loaded with AJAX get request.');

});

test('timeout', async({page}) =>{
    test.setTimeout(10000);
    test.slow();
    const successBtn = page.locator('.bg-success');
    //await successBtn.click({timeout: 26000});
    await successBtn.click();
    
});