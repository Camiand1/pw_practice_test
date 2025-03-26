import {test} from '../test-options'
import {faker} from '@faker-js/faker'


test('parametrized methods', async({pageManager}) => {
    const randomFullName = faker.person.fullName({ sex: 'female'})
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(randomFullName, 'Testing', 'Female')
})

