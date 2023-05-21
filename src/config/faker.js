import  {faker } from '@faker-js/faker'

faker.locale = 'es'

export const generateUser = () => {

    return {
        _id: faker.database.mongodbObjectId(),
        name: faker.name.fullName(),
        password: 'secret',
        email: faker.internet.email(),
        strategy: 'local',
        carts: [{
            cart: faker.database.mongodbObjectId(),
            confirmed: false 
        }]

    }

}

