package test.disc;

import aims.media.DigitalVideoDisc;

public class TestPassingParameter {
    public static void main(String[] args) {
        DigitalVideoDisc jungleDvD = new DigitalVideoDisc("Jungle");
        DigitalVideoDisc cinderellaDvd = new DigitalVideoDisc("Cinderella");

        swap(jungleDvD, cinderellaDvd);
        System.out.println("jungle dvd title: " + jungleDvD.getTitle());
        System.out.println("cinderella dvd title: " + cinderellaDvd.getTitle());

        changeTitle(jungleDvD, cinderellaDvd.getTitle());
        System.out.println("jungle dvd title: " + jungleDvD.getTitle());
    }

    public static void swap(Object o1, Object o2) {
        Object tmp = o1;
        o1 = o2;
        o2 = tmp;
    }

    public static void changeTitle(DigitalVideoDisc dvd, String title) {
        String oldTitle = dvd.getTitle();
        dvd.setTitle(title);
        dvd = new DigitalVideoDisc(oldTitle);
    }

    public static void swap(DigitalVideoDisc dvd1, DigitalVideoDisc dvd2) {
        String temp = dvd1.getTitle();
        dvd1.setTitle(dvd2.getTitle());
        dvd2.setTitle(temp);
    }
}
