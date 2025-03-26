import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import {faker} from '@faker-js/faker'

test.beforeEach(async({page}) => {
    await page.goto('/')
})

test('navigate to form page @smoke', async({page}) => {

    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().browserWindowsPage()
    await pm.navigateTo().alertsPage()
    await pm.navigateTo().framesPage()
    await pm.navigateTo().widgetsDatePickerPage()
})

test('parametrized methods', async({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName({ sex: 'female'})
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, 'Testing', 'Female')
    await page.screenshot({path: 'screenshots/formsLayoutsPage.png'})
    const buffer = await page.screenshot()
    console.log(buffer.toString('base64'))
    await pm.onFormLayoutsPage().submitInLineFormWithNameEmalAndCheckbox(randomFullName, randomEmail, true)
    await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: 'screenshot/inLineForm.png'})
})


test('date picker', async({page}) => {
    
    const pm = new PageManager(page)

    await pm.navigateTo().widgetsDatePickerPage()
    await pm.navigateTo().datePickerPage()
    await pm.onDatePikcerPage().selectCommonDatePickerDateFromToday(5)
    await pm.onDatePikcerPage().selectDatePickerWithRangeFromTOday(6, 15)
    
})