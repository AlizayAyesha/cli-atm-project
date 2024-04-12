import inquirer from "inquirer";
let userBalance = 1000; //Dollar //remainin b is nan shows in code make it number only
let userID;
const userPIN = 1234;
let userNameanswer = await inquirer.prompt([{
        type: "input",
        name: "userID",
        message: "Enter your ID here:"
    }]);
async function checkPIN() {
    let userPINanswer = await inquirer.prompt([
        {
            type: 'input',
            name: 'userPINanswer',
            message: 'Please enter your PIN code:',
            mask: '*' // Mask the input for security
        }
    ]);
    if ((parseInt(userPINanswer.userPINanswer) === userPIN)) {
        console.log("Correct PIN code");
    }
    else {
        console.log("Incorrect PIN code. Please try again");
        await checkPIN(); // Ask again if the code is incorrect
    }
}
await checkPIN(); // Initial call to start checking the PIN
let accountTypeAns = await inquirer.prompt([{
        type: "list",
        name: "accountType",
        message: "Please select your account type:",
        choices: ["Savings Account", "Current Account"]
    }]);
console.log("Account Type: " + accountTypeAns.accountType);
let transactionAns = await inquirer.prompt([{
        type: "list",
        name: "transaction",
        message: "Please select your option:",
        choices: ["Withdrawal", "Check Balance", "Fast Cash"]
    }]);
if (transactionAns.transaction === "Withdrawal") {
    let amountAns = await inquirer.prompt([{
            name: "Amount",
            type: "number",
            message: "Enter amount to withdraw:",
            validate: function (value) {
                return value > 0; // Validate that the amount is greater than 0
            }
        }]);
    let amountToWithdraw = parseFloat(amountAns.Amount); // Parse the amount as a float
    if (!isNaN(amountToWithdraw)) { // Check if the parsed amount is a valid number
        userBalance -= amountToWithdraw; // Deduct the amount from userBalance
        console.log("Your remaining balance is: " + userBalance);
    }
    else {
        console.log("Invalid amount entered. Please enter a valid number.");
    }
}
else if (transactionAns.transaction === "Check Balance") {
    console.log("Your balance is:" + userBalance);
    console.log(""); // Adding an empty line for separation
}
else if (transactionAns.transaction === "Fast Cash") {
    console.log("Fast Cash transaction selected"); // Handle fast cash transaction
}
