package test.media;

import java.util.ArrayList;
import java.util.List;

import aims.media.Book;
import aims.media.CompactDisc;
import aims.media.DigitalVideoDisc;
import aims.media.Media;

public class MediaTest {
    public static void main(String[] args) {
        List<Media> mediae = new ArrayList<Media>();

        CompactDisc cd = new CompactDisc("Adele", "Music", "Adele", 150.5f);
        DigitalVideoDisc dvd = new DigitalVideoDisc("The Lion King", "Animation", "Roger Allers", 87, 19.95f);
        
        Book book = new Book();
        book.setTitle("The Alchemist");
        book.setCategory("Fiction");
        book.setCost(12.5f);
        book.addAuthor("Paulo Coelho");

        mediae.add(cd);
        mediae.add(dvd);
        mediae.add(book);

        for (Media m : mediae) {
            System.out.println(m.toString());
        }
    }
}