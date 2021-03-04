import { Selector } from 'testcafe';

const minimunRemainingTime = 200;
const mediumRemainingTime = 3000;

fixture `Test app Pagacoin`
    .page("http://localhost:3000/login")
    
    .beforeEach(async t => {        
        await t
            .maximizeWindow()
            .wait(mediumRemainingTime)     
    })

    test('Login in app, generate user and go to wallets', async t => {  
        
        const email = Selector('#email')
        const password = Selector('#password')
        const signin = Selector('button').withAttribute("type","submit")
        await t
            .click(email)
            .wait(minimunRemainingTime)                 
            .typeText(email, 'prueba@prueba.com', { speed: 0.3 })
            .wait(minimunRemainingTime)
        
        await t
            .click(password)
            .wait(minimunRemainingTime)                 
            .typeText(password, '123456', { speed: 0.3 })
            .wait(minimunRemainingTime)

        await t
            .click(signin)
            .wait(mediumRemainingTime)

        const newUserBtn = Selector('#add_new_user')
        const namenewUser = Selector('#name')
        const emailnewUser= Selector('#email')
        const phonenewUser = Selector('#phone')
        const BtnaddUser= Selector('#settingUser')
        
        await t
            .click(newUserBtn)
            .wait(minimunRemainingTime)                 
            .typeText(namenewUser, 'New user', { speed: 0.3 })
            .wait(minimunRemainingTime)          
            .typeText(emailnewUser, 'test@e2e.com', { speed: 0.3 }) 
            .wait(minimunRemainingTime)          
            .typeText(phonenewUser, '633024800', { speed: 0.3 })    
            .wait(minimunRemainingTime)   
            .click(BtnaddUser)
            .wait(mediumRemainingTime)
        
        const row = Selector(`table tbody tr:nth-child(1) button`).nth(0);
        
        await t
            .click(row)
            .wait(mediumRemainingTime)
        
        
    });

    