import javax.swing.JOptionPane;

public class SolveLinearOneVar {
    public static void main(String[] args) {
        double a = Double.parseDouble(JOptionPane.showInputDialog("Enter coefficient a (for ax + b = 0):"));
        double b = Double.parseDouble(JOptionPane.showInputDialog("Enter coefficient b (for ax + b = 0):"));

        String result;
        if (a == 0) {
            if (b == 0) {
                result = "Infinite solutions";
            } else {
                result = "No solution";
            }
        } else {
            double x = -b / a;
            result = "Unique solution: x = " + x;
        }

        JOptionPane.showMessageDialog(null, result);
    }
}
