import {test as base} from '@playwright/test'
import { PageManager } from '../PW-PRACTIVE-APP/page-objects/pageManager'

export type TestOptions = {
    globalsQAURL: string 
    formLayoutsPage: string
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    globalsQAURL: ['', {option: true}],
    formLayoutsPage: async({page}, use) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
        console.log('Tear Down')
    },

    pageManager: async({page, formLayoutsPage}, use) => {
        const pm = new PageManager(page)
        await use(pm)
    }
})

//everything that is before the 'use' will be executed as a precondition