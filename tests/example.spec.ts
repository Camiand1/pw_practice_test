import { expect, test } from '@playwright/test';
import { get } from 'http';


test.beforeEach(async({page}) => {  
  await page.goto('https://demo.applitools.com/');
  await expect(page).toHaveTitle('ACME Demo App by Applitools'); 
  //await page.getByLabel('Username', { exact: true }).click();
});


test('the first test', async ({ page }) => {
  await page.getByText('Enter your username').click;
});

 
test('Locator syntax rules', async ({ page }) => {
  //by Tag name
  await page.locator('input').click;
  
  // by id
  page.locator('#username');
  
  // by class value .classValue
  page.locator('.form-control');
  
  // by full class value [classValue]
  page.locator('[class="form-control"]');
  
  // by attribute [attibuteValue]
  page.locator('[type="text"]');

  //combine different selectors
  page.locator('input[class="form-control"].form-control[otherinput]');

  // by xpath [NOT RECOMMENDED]
  page.locator('//*[id="username"]');

  // by partial text match
  page.locator(':text("Remember")');

  //by exact text match
  page.locator(':text-is("Remember Me")');
});


test('User facing', async({page}) => {
  await page.getByRole('textbox', {name: "Enter your username"}).first().click();
  
  await page.getByRole('checkbox', {name: "Remember Me"}).first().click();
  await page.getByPlaceholder('Enter your username').click();
  
  await page.getByText('Username').click();

  await page.getByTestId('Username').click();
  
});


test('Locating Child Elements', async({page}) => {
  await page.locator('form div :text-is("Remember Me")').click();
  await page.locator('form').locator('div').locator(':text-is("Username")').click();

  await page.locator('form').getByRole('button', {name: "Sign in"}).first().click();

  // by index -- NO Recommended because DOM can change
  await page.locator('form').nth(3).getByRole('button').click();
});


test('Locating Parent Elements', async({page}) => {
  await page.locator('form', {hasText: "Login Form"}).getByRole('checkbox', {name: "Remember Me"}).first().click();

  await page.locator('form', {has: page.locator('#username')}).getByRole('checkbox', {name: "Remember Me"}).first().click();

  await page.locator('form').filter({hasText: 'Basic form'}).getByRole('checkbox', {name: "Remember Me"}).first().click();

  await page.locator('form').filter({has: page.locator('.form-control')}).getByRole('checkbox', {name: "Remember Me"}).click();

  await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox',
    {name: "Email"}).click();

  await page.locator(':text-is("Login Form")').locator('..').getByRole('checkbox', {name: "Remember Me"}).first().click();
});


test('Reusing locators', async({page}) => {
  const basicForm = page.locator('form').filter({hasText: 'Basic form'});
  const emailField = basicForm.getByRole('textbox', {name: "Enter your username"});

  await emailField.fill('test@gmail.com');
  await basicForm.getByRole('textbox', {name: "Enter your passwpr"}).fill('test123');
  await basicForm.getByRole('button').click();

  await expect(emailField).toHaveValue('test@gmal.com');
});


test('Extracting Values', async({page}) => {
  //single test value
  const basicForm = page.locator('form').filter({hasText: 'Basic form'});
  const btnText = await basicForm.locator('button').textContent();
  expect(btnText).toEqual('Submit');

  //all text values
  const allRadioBtnsLabels = await page.locator('nb-radio').allTextContents();
  expect(allRadioBtnsLabels).toContain("Option 1");

  //input value
  const emailField = basicForm.getByRole('textbox', {name: "Email"});
  await emailField.fill('test@test.com');
  const emailValue = await emailField.inputValue();
  expect(emailValue).toEqual('text@test.com');

  const placeholderValue = await emailField.getAttribute('placeholder');
  expect(placeholderValue).toEqual('Emails');
});


test('Assertions', async({page}) => {

  //General Assertions
  const value = 5
  expect(value).toEqual(5)
  
  const usernameLbl = page.locator('form').locator('div').locator(':text-is("Username")');
  const text = await usernameLbl.textContent();
  expect(text).toEqual("Username");

  //Local Assertion
  await expect(usernameLbl).toHaveText("Username");
  await expect(usernameLbl).toBeVisible();
  
  // Soft Assertion (no matter this assertion fails, it goes to continue executing the code)
  await expect.soft(usernameLbl).toHaveText("UsernameW");  
  await usernameLbl.click();
});

