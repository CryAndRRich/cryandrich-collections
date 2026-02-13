import javax.swing.JOptionPane;

public class ShowTwoNumbers {
    public static void main(String[] args) {
        String strNum1, strNum2;
        String strNotification = "You've just entered: ";
    
        strNum1 = JOptionPane.showInputDialog(null,
                    "Please input the first number: ", "Input the first number",
                    JOptionPane.INFORMATION_MESSAGE);
        strNotification += strNum1 + " and ";
        strNum2 = JOptionPane.showInputDialog(null,
                    "Please input the second number: ", "Input the second number",
                    JOptionPane.INFORMATION_MESSAGE);
        strNotification += strNum2;
    
        double num1 = Double.parseDouble(strNum1);
        double num2 = Double.parseDouble(strNum2);

        double sum = num1 + num2;
        double difference = num1 - num2;
        double product = num1 * num2;

        double quotient = 0;
        String errorMessage = "";
        if (num2 != 0) {
            quotient = num1 / num2;
        } else {
            errorMessage = "Division by zero is not allowed";
        }

        JOptionPane.showMessageDialog(null, 
            strNotification + "\n\n" +
            "The sum is: " + sum + "\n" +
            "The difference is: " + difference + "\n" +
            "The product is: " + product + "\n" +
            (num2 != 0 ? ("The quotient is: " + quotient) : errorMessage),
            "Calculation Results", JOptionPane.INFORMATION_MESSAGE);
    }
}
