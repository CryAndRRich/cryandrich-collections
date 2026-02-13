import java.util.Scanner;

public class DaysOfMonth {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int month = -1;
        int year = -1;

        while (month == -1) {
            System.out.print("Enter a month (full name, abbreviation, in 3 letters, or in number): ");
            String monthInput = sc.nextLine().trim().toLowerCase().replace(".", "");

            if (monthInput.matches("\\d+")) {
                try {
                    int m = Integer.parseInt(monthInput);
                    if (m >= 1 && m <= 12) {
                        month = m;
                    } else {
                        System.out.println("Month must be in range 1-12, please re-enter");
                    }
                } catch (NumberFormatException e) {
                    System.out.println("Can not convert month to number, please re-enter");
                }
            } else {
                if (monthInput.equals("january") || monthInput.equals("jan")) {
                    month = 1;
                } else if (monthInput.equals("february") || monthInput.equals("feb")) {
                    month = 2;
                } else if (monthInput.equals("march") || monthInput.equals("mar")) {
                    month = 3;
                } else if (monthInput.equals("april") || monthInput.equals("apr")) {
                    month = 4;
                } else if (monthInput.equals("may")) {
                    month = 5;
                } else if (monthInput.equals("june") || monthInput.equals("jun")) {
                    month = 6;
                } else if (monthInput.equals("july") || monthInput.equals("jul")) {
                    month = 7;
                } else if (monthInput.equals("august") || monthInput.equals("aug")) {
                    month = 8;
                } else if (monthInput.equals("september") || monthInput.equals("sep") || monthInput.equals("sept")) {
                    month = 9;
                } else if (monthInput.equals("october") || monthInput.equals("oct")) {
                    month = 10;
                } else if (monthInput.equals("november") || monthInput.equals("nov")) {
                    month = 11;
                } else if (monthInput.equals("december") || monthInput.equals("dec")) {
                    month = 12;
                } else {
                    System.out.println("Invalid month name, please re-enter");
                }
            }
        }

        while (true) {
            System.out.print("Enter a year (non-negative number and enter all the digits): ");
            String yearInput = sc.nextLine().trim();

            if (!yearInput.matches("\\d{4,}")) {
                System.out.println("Invalid year format, please re-enter");
                continue;
            }

            try {
                year = Integer.parseInt(yearInput);
                if (year < 0) {
                    System.out.println("Year must be a non-negative number, please re-enter");
                    continue;
                }
                break;
            } catch (NumberFormatException e) {
                System.out.println("Can not convert year to number, please re-enter");
            }
        }

        boolean leap = false;
        if (year % 4 != 0) leap = false;
        else {
            if (year % 100 != 0) leap = true;
            else {
                if (year % 400 == 0) leap = true;
                else leap = false;
            }
        }

        int days;
        if (month == 2) {
            if (leap) {
                days = 29;
            } else {
                days = 28;
            }
        } else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            days = 31;
        } else {
            days = 30;
        }

        String[] monthNames = {"", "January", "February", "March", "April", "May", "June", 
                               "July", "August", "September", "October", "November", "December"};

        System.out.println(monthNames[month] + " " + year + " has " + days + " days");
        sc.close();
    }
}
