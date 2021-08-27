'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
}

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
}

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
}

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
}

const accounts = [account1, account2, account3, account4]

let currentAccount

// Elements
const labelWelcome = document.querySelector('.welcome')
const labelDate = document.querySelector('.date')
const labelBalance = document.querySelector('.balance__value')
const labelSumIn = document.querySelector('.summary__value--in')
const labelSumOut = document.querySelector('.summary__value--out')
const labelSumInterest = document.querySelector('.summary__value--interest')
const labelTimer = document.querySelector('.timer')

const containerApp = document.querySelector('.app')
const containerMovements = document.querySelector('.movements')

const btnLogin = document.querySelector('.login__btn')
const btnTransfer = document.querySelector('.form__btn--transfer')
const btnLoan = document.querySelector('.form__btn--loan')
const btnClose = document.querySelector('.form__btn--close')
const btnSort = document.querySelector('.btn--sort')

const inputLoginUsername = document.querySelector('.login__input--user')
const inputLoginPin = document.querySelector('.login__input--pin')
const inputTransferTo = document.querySelector('.form__input--to')
const inputTransferAmount = document.querySelector('.form__input--amount')
const inputLoanAmount = document.querySelector('.form__input--loan-amount')
const inputCloseUsername = document.querySelector('.form__input--user')
const inputClosePin = document.querySelector('.form__input--pin')

const displayMovements = function (account, sort = false){
  const movs = sort ? account.movements.slice().sort((a,b) => a-b) : account.movements
  containerMovements.innerHTML = ''
  movs.forEach(function(mov, i){
    const type = mov > 0 ? 'deposit' : 'withdrawal'

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>
    `
    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
}


const generateUserName = function(accs){
  accs.forEach(function(acc){
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word=>word[0])
      .join('')
  })
}
generateUserName(accounts)

const calcPrintBalance = function(account){
  const balance =  account.movements.reduce((acc, cur)=>acc + cur,0)
  account.balance = balance
  labelBalance.textContent = `${balance}€`
}


const calcDisplaySummary = function(account){
  const eurToUsd = 1.1
  
  const totalDepositIn = account.movements
    .filter(mov => mov > 0)
    .reduce((acc,mov) => acc + mov, 0)

  const totalDepositOut = account.movements
    .filter(mov => mov < 0)
    .reduce((acc,mov) => acc + mov, 0)

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(dep => dep * account.interestRate/100)
    .filter(int => int > 1)
    .reduce((acc,mov) => acc + mov, 0)

  labelSumIn.textContent = `${totalDepositIn}€`
  labelSumOut.textContent = `${Math.abs(totalDepositOut)}€`
  labelSumInterest.textContent = `${Math.abs(interest)}€`
}

const displayDetails = function (account){
   
    // Display movements
    displayMovements(account)

    // Display Balance
    calcPrintBalance(account)

    // Display Summary
    calcDisplaySummary(account)
}


// Login
btnLogin.addEventListener('click', function(e){
  e.preventDefault()

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)

  if(currentAccount?.pin === Number(inputLoginPin.value)){ 
    // Display UI and Welcome messge
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`

    containerApp.style.opacity = 100

    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = ''
    inputLoginPin.blur()
    
    displayDetails(currentAccount)
  }


})

//Transfer
btnTransfer.addEventListener('click', function(e){
  e.preventDefault()
  
  const transferTo = accounts.find(acc => acc.username === inputTransferTo.value)
  const transferAmount = Number(inputTransferAmount.value)
  const currBalance = currentAccount.balance

  if(transferTo && transferAmount < currBalance && transferAmount > 0 && transferTo?.username != currentAccount?.username){
    transferTo?.movements.push(transferAmount)
    currentAccount.movements.push(-Math.abs(transferAmount))
    inputTransferTo.value= ""
    inputTransferAmount.value= ""
    inputTransferAmount.blur()

    displayDetails(currentAccount)
  }
  
})

// Loan

btnLoan.addEventListener('click', function(e){
  e.preventDefault()

  const loanAmount = Number(inputLoanAmount.value)

  if(currentAccount.movements.some(mov => mov >= loanAmount*0.1) && loanAmount > 0){
    currentAccount.movements.push(loanAmount)
    displayDetails(currentAccount)

    inputLoanAmount.value = ""
    inputLoanAmount.blur()
  }
})

// Close Account

btnClose.addEventListener('click', function(e){
  e.preventDefault()

  const closeUser = inputCloseUsername.value
  const closePin = Number(inputClosePin.value)

  if(closeUser === currentAccount.username && closePin === currentAccount.pin){
    const closeAccIndex = accounts.findIndex(acc => acc.username === closeUser)
    accounts.splice(closeAccIndex, 1)

    containerApp.style.opacity = 0

    inputClosePin.value = ""
    inputCloseUsername.value = ""
    inputCloseUsername.blur()
  }
})

// Sort Movements
let clickCount=0;
btnSort.addEventListener('click', function (e){
  e.preventDefault()
  
  clickCount++

  if(clickCount%2 == 1){
    displayMovements(currentAccount, true)
  }else{
    displayMovements(currentAccount, false)
  }

})

