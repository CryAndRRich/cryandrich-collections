import java.util.Arrays;
import java.util.Scanner;

public class CalculateArrays {
    public static void main(String[] args) {
        Scanner keyboard = new Scanner(System.in);

        System.out.print("Enter number of elements: ");
        int n = keyboard.nextInt();
        int[] numbers = new int[n];

        System.out.println("Enter " + n + " numbers:");
        for (int i = 0; i < n; i++) {
            numbers[i] = keyboard.nextInt();
        }

        Arrays.sort(numbers);
        System.out.println("Sorted numeric array: " + Arrays.toString(numbers));

        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        double average = (double) sum / n;

        System.out.println("Sum = " + sum);
        System.out.println("Average = " + average);
        
        keyboard.close();
    }
}