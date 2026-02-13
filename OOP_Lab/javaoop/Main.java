public class Main {
    public static void main(String[] args){
        Student s1 = new Student("Tran Nam Hai", 2024, "IT-E10 02", 3.85);
        Student s2 = new Student("Nguyen Thi Ha Chi", 2022, "ITTN", 3.75);
        Student s3 = new Student("Tran Gia Dinh", 2023, "IT1 01", 3.92);
        Student s4 = new Student("Khuong Anh Tai", 2023, "IT2 05", 4.00);
        Student s5 = new Student("Nguyen Ngo Quang Tung", 2024, "IT1 01", 3.69);
        
        Student[] arr = {s1, s2, s3, s4, s5};
        for (Student s : arr) {
            s.displayInfo();
        }

        double averageGPA = Student.calculateAverageGpa(arr);
        System.out.printf("Average GPA of all students: %.2f\n", averageGPA);

        boolean ascending = false;
        Student.bubbleSort(arr, ascending);
        if (ascending) {
            System.out.println("Students sorted by GPA in ascending order:");
        } else {
            System.out.println("Students sorted by GPA in descending order:");
        }
        
        for (Student s : arr) {
            s.displayInfo();
        }
    }
}