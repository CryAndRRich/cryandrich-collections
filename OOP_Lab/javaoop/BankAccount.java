public class BankAccount {
    private String ownerName;
    private String accountNumber;
    private double initialBalance;
    private static double MIN_BALANCE = 50000;
    private static double WITHDRAW_FEE = 5000;

    public BankAccount(String ownerName, String accountNumber, double initialBalance) {
        this.ownerName = ownerName;
        this.accountNumber = accountNumber;
        if (initialBalance < MIN_BALANCE) {
            this.initialBalance = MIN_BALANCE;
        } else {
            this.initialBalance = initialBalance;
        }
    }

    public void deposit(double amount) {
        if (amount > 0) {
            initialBalance += amount;
        }
    }

    public boolean withdraw(double amount) {
        if (amount > 0 && (initialBalance - amount - WITHDRAW_FEE) >= MIN_BALANCE) {
            initialBalance -= (amount + WITHDRAW_FEE);
            return true;
        }
        return false;
    }

    public double getBalance() {
        return initialBalance;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public String getAccountNumber() {
        return accountNumber;
    }
}
