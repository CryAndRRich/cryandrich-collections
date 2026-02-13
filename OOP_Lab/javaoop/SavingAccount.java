public class SavingAccount extends BankAccount {
    private static double INTEREST_RATE = 0.03; 

    public SavingAccount(String ownerName, String accountNumber, double initialBalance) {
        super(ownerName, accountNumber, initialBalance);
    }

    public void applyInterest() {
        double interest = getBalance() * INTEREST_RATE;
        deposit(interest);
    }

    public boolean withdraw(double amount) {
        return false;
    }
}
