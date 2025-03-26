import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatePickerPage extends HelperBase{

    constructor(page: Page){    
        super(page)
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number){
        const calendarInputField = this.page.locator('#datePickerMonthYearInput')
        await calendarInputField.click()
        const dateToAssert = await this.selectCommonDatePickerDateFromToday(numberOfDaysFromToday)

        await expect(calendarInputField).toHaveValue(dateToAssert)
    }


    async selectDatePickerWithRangeFromTOday(startDayFromToday: number, endDayFromToday: number){
        const calendarInputField = this.page.locator('#dateAndTimePickerInput')|
        await calendarInputField.click()
        const dateToAssertStart = await this.selectCommonDatePickerDateFromToday(startDayFromToday)
        const dateToAssertEnd = await this.selectCommonDatePickerDateFromToday(endDayFromToday)
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`

        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    private async selectDateInTheCalendar(numberOfDaysFromToday: number){

        let date= new Date()
        date.setDate(date.getDate()+numberOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

  
        let calendarMonthAndYear = await this.page.locator('.react-datepicker__month-select').textContent()
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`
        while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
          await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
          calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
      
        await this.page.locator('.react-datepicker').getByText(expectedDate, {exact:true}).click()
        return dateToAssert

    }
}