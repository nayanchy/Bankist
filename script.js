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
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements){
  containerMovements.innerHTML = ''
  movements.forEach(function(mov, i){
    const type = mov > 0 ? 'deposit' : 'withdrawal';

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

const calcPrintBalance = function(movements){
  const balance =  movements.reduce((acc, cur)=>acc + cur,0)

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



let currentAccount

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
    
    // Display movements
    displayMovements(currentAccount.movements)

    // Display Balance
    calcPrintBalance(currentAccount.movements)

    // Display Summary
    calcDisplaySummary(currentAccount)
  }


})

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/**
 * Find Method
 */
// const firstWithdrawal = movements.find(mov => mov < 0)

// const account = accounts.find(acc => acc.owner === 'Jessica Davis')
// console.log(account)




/**
 * Map Method
 */

// const movement = [100, 234, -445, 3234, -543, -541, 400];

// const eurToUsd = 1.1;
// const movementsNew = movement.map(function(move){
//   return Math.floor(move * eurToUsd);
// })

// console.log(movementsNew)

// const movementsNew1 = movement.map((move)=> Math.floor(move * eurToUsd));

// console.log(movementsNew1)

/**
 * Filter Method
 */

// const deposits = movements.filter(mov => mov > 0)

// console.log(deposits)

/**
 * Reduce Method
 */
// Getting the max movement by reduce method
// const max = account1.movements.reduce((acc,curr) => acc > curr ? acc : curr, movements[0])

// console.log(max)

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets
TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀
*/
// Solution 01
// const data1 = [5, 2, 4, 1, 15, 8, 3]
// const data2 = [16, 6, 10, 5, 6, 1, 4]

// let data1humAge = []

// // With foreach method

// // const calcAverageHumanAge = function (dogAge){
// //   dogAge.forEach(function(age){
// //     let humanage = 0;
// //     age <=2 ? humanage = 2*age : humanage = 16 + age*4;
// //     data1humAge.push(humanage)
// //   })
// // }

// // With Map method

// const calcAverageHumanAge = function(dogAge){
//   let ageSum = 0
//   const humanAge = dogAge.map(age => age <=2 ? 2*age : 16 + age*4).filter(age => age > 18)
//   // humanAge.forEach(function(ags){
//   //   ageSum += ags
//   // })

//   const avg = humanAge.reduce((acc, age) => acc + age)/humanAge.length

//   console.log(avg)
// }
// calcAverageHumanAge(data2)

