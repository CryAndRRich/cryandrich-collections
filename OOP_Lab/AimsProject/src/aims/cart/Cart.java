package aims.cart;

import java.util.Collections;
import aims.media.Media;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import aims.exception.LimitExceededException;
public class Cart {
    public static final int MAX_NUMBERS_ORDERED = 20;
    
    private ObservableList<Media> itemsOrdered = FXCollections.observableArrayList();

    public ObservableList<Media> getItemsOrdered() {
        return itemsOrdered;
    }

    public void addMedia(Media media) throws LimitExceededException {
        if (itemsOrdered.size() >= MAX_NUMBERS_ORDERED) {
            throw new LimitExceededException("ERROR: The number of media has reached its limit (" + MAX_NUMBERS_ORDERED + ")");
        } 
        
        if (itemsOrdered.contains(media)) {
            System.out.println(media.getTitle() + " is already in the cart");
        } else {
            itemsOrdered.add(media);
            System.out.println("The media has been added: " + media.getTitle());
        }
    }

    public void removeMedia(Media media) {
        if (itemsOrdered.contains(media)) {
            itemsOrdered.remove(media);
            System.out.println("The media has been removed: " + media.getTitle());
        } else {
            System.out.println("The media is not in the cart");
        }
    }

    public float totalCost() {
        float total = 0;
        for (Media media : itemsOrdered) {
            total += media.getCost();
        }
        return total;
    }

    public void print() {
        System.out.println("\n***********************CART***********************");
        System.out.println("Ordered Items:");
        for (int i = 0; i < itemsOrdered.size(); i++) {
            System.out.println((i + 1) + ". " + itemsOrdered.get(i).toString());
        }
        System.out.println("Total cost: " + totalCost() + " $");
        System.out.println("***************************************************");
    }
    
    public Media searchById(int id) {
        boolean found = false;
        for (Media media : itemsOrdered) {
            if (media.getId() == id) {
                System.out.println("Found Media: " + media.toString());
                found = true;
                return media;
            }
        }
        if (!found) {
            System.out.println("No media found with ID: " + id);
        }
        return null;
    }

    public Media searchByTitle(String title) {
        boolean found = false;
        for (Media media : itemsOrdered) {
            if (media.getTitle().equals(title)) {
                System.out.println("Found Media: " + media.toString());
                found = true;
                return media;
            }
        }
        if (!found) {
            System.out.println("No media found with title: " + title);
        }
        return null;
    }

    public void sortMediaByTitle() {
        Collections.sort(itemsOrdered, Media.COMPARE_BY_TITLE_COST);
    }

    public void sortMediaByCost() {
        Collections.sort(itemsOrdered, Media.COMPARE_BY_COST_TITLE);
    }
}