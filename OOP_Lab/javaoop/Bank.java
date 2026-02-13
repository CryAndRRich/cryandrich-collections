import java.util.ArrayList;

public class Bank {
    private ArrayList<BankAccount> accounts = new ArrayList<>();

    public void addAccount(BankAccount account) {
        accounts.add(account);
    }

    public void showAllAccounts() {
        for (BankAccount a : accounts) {
            System.out.println(a);
        }
    }

    public static void main(String[] args) {
        Bank bank = new Bank();

        BankAccount acc1 = new BankAccount("Alice", "123456", 100000);
        BankAccount acc2 = new BankAccount("Bob", "654321", 40000); // auto-corrected to 50000

        bank.addAccount(acc1);
        bank.addAccount(acc2);

        acc1.deposit(50000);
        acc1.withdraw(20000);
        acc2.withdraw(10000);

        System.out.println("\nAll accounts:");
        bank.showAllAccounts();
    }
}
