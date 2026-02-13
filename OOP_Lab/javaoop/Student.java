public class Student{
    private String studentId;
    private String fullName;
    private int yearOfAdmission;
    private String major;
    private double gpa;

    private static int idCounter = 0;

    public Student(String fullName, int yearOfAdmission, String major, double gpa) {
        this.studentId = generateId();
        this.fullName = fullName;
        this.yearOfAdmission = yearOfAdmission;
        this.major = major;
        this.gpa = gpa;
    }

    public void displayInfo() {
        System.out.println("############################");
        System.out.println("Student ID (MSSV) : " + studentId);
        System.out.println("Full name         : " + fullName);
        System.out.println("Year of admission : " + yearOfAdmission);
        System.out.println("Major             : " + major);
        System.out.println("GPA               : " + gpa);
        System.out.println("############################");
    }

    public double getGpa() {
        return gpa;
    }

    public static double calculateAverageGpa(Student... students) {
        if (students.length == 0) {
            return 0.0;
        }
        double sum = 0;
        for (Student s: students) {
            sum += s.gpa;
        }
        return sum / students.length;
    }

    public static void bubbleSort(Student[] arr, boolean ascending) {
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = 0; j < arr.length - i - 1; j++) {
                if (ascending && arr[j].getGpa() > arr[j + 1].getGpa()) {
                    swap(arr, j, j + 1);
                } else if (!ascending && arr[j].getGpa() < arr[j + 1].getGpa()) {
                    swap(arr, j, j + 1);
                }
            }
        }
    }

    private static String generateId() {
        idCounter += 1;
        return String.format("%08d", idCounter);
    }

    private static void swap(Student[] arr, int i, int j) {
        Student temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
