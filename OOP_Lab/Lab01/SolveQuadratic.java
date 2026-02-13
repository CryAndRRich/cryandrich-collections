import javax.swing.JOptionPane;

public class SolveQuadratic {
    public static void main(String[] args) {
        double a = Double.parseDouble(JOptionPane.showInputDialog("Enter coefficient a (for ax^2 + bx + c = 0):"));
        double b = Double.parseDouble(JOptionPane.showInputDialog("Enter coefficient b (for ax^2 + bx + c = 0):"));
        double c = Double.parseDouble(JOptionPane.showInputDialog("Enter coefficient c (for ax^2 + bx + c = 0):"));

        String result;
        if (a == 0) {
            result = "";
            if (b == 0) {
                if (c == 0) {
                    result += "Infinite solutions";
                } else {
                    result += "No solution";
                }
            } else {
                double x = -c / b;
                result += "Unique solution: x = " + x;
            }
        } else {
            double delta = b * b - 4 * a * c;
            if (delta > 0) {
                double x1 = (-b + Math.sqrt(delta)) / (2 * a);
                double x2 = (-b - Math.sqrt(delta)) / (2 * a);
                result = "Two distinct real roots:\n x1 = " + x1 + ", x2 = " + x2;
            } else if (delta == 0) {
                double x = -b / (2 * a);
                result = "Double root: x = " + x;
            } else {
                result = "No real roots";
            }
        }

        JOptionPane.showMessageDialog(null, result);
    }
}
