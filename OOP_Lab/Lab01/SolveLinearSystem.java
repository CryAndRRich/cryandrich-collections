import javax.swing.JOptionPane;

public class SolveLinearSystem {
    public static void main(String[] args) {
        double a11 = Double.parseDouble(JOptionPane.showInputDialog("Enter a11 (for equation 1: a11 * x1 + a12 * x2 = b1):"));
        double a12 = Double.parseDouble(JOptionPane.showInputDialog("Enter a12 (for equation 1: a11 * x1 + a12 * x2 = b1):"));
        double b1  = Double.parseDouble(JOptionPane.showInputDialog("Enter b1 (for equation 1: a11 * x1 + a12 * x2 = b1):"));

        double a21 = Double.parseDouble(JOptionPane.showInputDialog("Enter a21 (for equation 2: a21 * x1 + a22 * x2 = b2):"));
        double a22 = Double.parseDouble(JOptionPane.showInputDialog("Enter a22 (for equation 2: a21 * x1 + a22 * x2 = b2):"));
        double b2  = Double.parseDouble(JOptionPane.showInputDialog("Enter b2 (for equation 2: a21 * x1 + a22 * x2 = b2):"));

        String result;
        double D = a11 * a22 - a21 * a12;
        double D1 = b1 * a22 - b2 * a12;
        double D2 = a11 * b2 - a21 * b1;

        if (D != 0) {
            double x1 = D1 / D;
            double x2 = D2 / D;
            result = "Unique solution:\n x1 = " + x1 + ", x2 = " + x2;
        } else {
            if (D1 == 0 && D2 == 0) {
                result = "Infinite solutions";
            } else {
                result = "No solution";
            }
        }

        JOptionPane.showMessageDialog(null, result);
    }
}
