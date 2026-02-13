package aims;

import java.util.Scanner;

import aims.cart.Cart;
import aims.exception.LimitExceededException;
import aims.exception.PlayerException;
import aims.media.Book;
import aims.media.Track;
import aims.media.CompactDisc;
import aims.media.DigitalVideoDisc;
import aims.media.Media;
import aims.media.Playable;
import aims.store.Store;

public class Aims {
    private static Store store = new Store();
    private static Cart cart = new Cart();
    private static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) throws PlayerException, LimitExceededException {
        initSetup();

        boolean exit = false;
        while (!exit) {
            showMenu();
            int choice = getChoice(0, 3);
            switch (choice) {
                case 0:
                    exit = true;
                    System.out.println("Goodbye");
                    break;
                case 1:
                    viewStore();
                    break;
                case 2:
                    updateStore();
                    break;
                case 3:
                    seeCart();
                    break;
            }
        }
        scanner.close();
    }

    public static void showMenu() {
        System.out.println("\nAIMS: ");
        System.out.println("--------------------------------");
        System.out.println("1. View store");
        System.out.println("2. Update store");
        System.out.println("3. See current cart");
        System.out.println("0. Exit");
        System.out.println("--------------------------------");
        System.out.println("Please choose a number: 0-1-2-3");
    }

    public static void storeMenu() {
        System.out.println("\nOptions: ");
        System.out.println("--------------------------------");
        System.out.println("1. See a media's details");
        System.out.println("2. Add a media to cart");
        System.out.println("3. Play a media");
        System.out.println("4. See current cart");
        System.out.println("0. Back");
        System.out.println("--------------------------------");
        System.out.println("Please choose a number: 0-1-2-3-4");
    }

    public static void mediaDetailsMenu() {
        System.out.println("\nOptions: ");
        System.out.println("--------------------------------");
        System.out.println("1. Add to cart");
        System.out.println("2. Play");
        System.out.println("0. Back");
        System.out.println("--------------------------------");
        System.out.println("Please choose a number: 0-1-2");
    }

    public static void cartMenu() {
        System.out.println("\nOptions: ");
        System.out.println("--------------------------------");
        System.out.println("1. Filter medias in cart");
        System.out.println("2. Sort medias in cart");
        System.out.println("3. Remove media from cart");
        System.out.println("4. Play a media");
        System.out.println("5. Place order");
        System.out.println("0. Back");
        System.out.println("--------------------------------");
        System.out.println("Please choose a number: 0-1-2-3-4-5");
    }

    public static void viewStore() throws PlayerException, LimitExceededException {
        store.print();
        boolean back = false;
        while (!back) {
            storeMenu();
            int choice = getChoice(0, 4);
            switch (choice) {
                case 0: 
                    back = true; 
                    break;
                case 1: 
                    seeMediaDetails(); 
                    break;
                case 2: 
                    addMediaToCart(); 
                    break;
                case 3: 
                    playMedia(); 
                    break;
                case 4: 
                    seeCart(); 
                    break;
            }
        }
    }

    public static void seeMediaDetails() throws PlayerException, LimitExceededException {
        System.out.print("Enter the title of the media: ");
        String title = scanner.nextLine();
        Media media = store.findMedia(title);

        if (media != null) {
            System.out.println(media.toString());
            mediaDetailsMenu();
            int choice = getChoice(0, 2);
            switch (choice) {
                case 1:
                    cart.addMedia(media);
                    break;
                case 2:
                    if (media instanceof Playable) {
                        ((Playable) media).play();
                    } else {
                        System.out.println("This media cannot be played");
                    }
                    break;
                case 0: break;
            }
        } else {
            System.out.println("Media not found");
        }
    }

    public static void addMediaToCart() throws LimitExceededException {
        System.out.print("Enter the title of the media to add: ");
        String title = scanner.nextLine();
        Media media = store.findMedia(title);
        if (media != null) {
            cart.addMedia(media);
            if (media instanceof DigitalVideoDisc) {
                System.out.println("Number of DVDs in cart: " + cart.getItemsOrdered().stream().filter(m -> m instanceof DigitalVideoDisc).count());
            }
        } else {
            System.out.println("Media not found in store");
        }
    }

    public static void playMedia() throws PlayerException {
        System.out.print("Enter the title of the media to play: ");
        String title = scanner.nextLine();
        Media media = store.findMedia(title);
        if (media != null) {
            if (media instanceof Playable) {
                ((Playable) media).play();
            } else {
                System.out.println("This media cannot be played");
            }
        } else {
            System.out.println("Media not found");
        }
    }

    public static void updateStore() {
        System.out.println("1. Add a new media to store");
        System.out.println("2. Remove media from store");
        System.out.println("0. Back");
        int choice = getChoice(0, 2);
        
        if (choice == 1) {
            System.out.println("Enter title: ");
            String title = scanner.nextLine();
            System.out.println("Enter category: ");
            String category = scanner.nextLine();
            System.out.println("Enter cost: ");
            float cost = Float.parseFloat(scanner.nextLine());
            
            DigitalVideoDisc dvd = new DigitalVideoDisc(title, category, cost);
            store.addMedia(dvd);
        } else if (choice == 2) {
            System.out.print("Enter title to remove: ");
            String title = scanner.nextLine();
            Media media = store.findMedia(title);
            if (media != null) {
                store.removeMedia(media);
            } else {
                System.out.println("Media not found");
            }
        }
    }

    public static void seeCart() throws PlayerException {
        cart.print();
        boolean back = false;
        while (!back) {
            cartMenu();
            int choice = getChoice(0, 5);
            switch (choice) {
                case 0:
                    back = true;
                    break;
                case 1:
                    filterCart();
                    break;
                case 2:
                    sortCart();
                    break;
                case 3:
                    System.out.print("Enter title to remove: ");
                    String removeTitle = scanner.nextLine();
                    Media mediaToRemove = cart.searchByTitle(removeTitle);
                    if (mediaToRemove != null) {
                        cart.removeMedia(mediaToRemove);
                    }
                    break;
                case 4:
                    System.out.print("Enter title to play: ");
                    String playTitle = scanner.nextLine();
                    Media mediaToPlay = cart.searchByTitle(playTitle);
                    if (mediaToPlay != null) {
                        if (mediaToPlay instanceof Playable) {
                            ((Playable) mediaToPlay).play();
                        } else {
                            System.out.println("This media cannot be played");
                        }
                    }
                    break;
                case 5:
                    System.out.println("An order has been created");
                    cart = new Cart();
                    System.out.println("Cart is now empty");
                    break;
            }
        }
    }

    public static void filterCart() {
        System.out.println("1. Filter by ID");
        System.out.println("2. Filter by Title");
        int option = getChoice(1, 2);
        if (option == 1) {
            System.out.print("Enter ID: ");
            int id = Integer.parseInt(scanner.nextLine());
            cart.searchById(id);
        } else {
            System.out.print("Enter Title: ");
            String title = scanner.nextLine();
            cart.searchByTitle(title);
        }
    }

    public static void sortCart() {
        System.out.println("1. Sort by Title");
        System.out.println("2. Sort by Cost");
        int option = getChoice(1, 2);
        if (option == 1) {
            cart.sortMediaByTitle();
        } else {
            cart.sortMediaByCost();
        }
        cart.print();
    }

    public static int getChoice(int min, int max) {
        while (true) {
            try {
                System.out.print("Your choice: ");
                int choice = Integer.parseInt(scanner.nextLine());
                if (choice >= min && choice <= max) {
                    return choice;
                }
                System.out.println("Invalid choice. Please try again");
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a number");
            }
        }
    }

    public static void initSetup() {
        DigitalVideoDisc dvd1 = new DigitalVideoDisc("The Lion King", "Animation", "Roger Allers", 87, 19.95f);
        DigitalVideoDisc dvd2 = new DigitalVideoDisc("Star Wars", "Science Fiction", "George Lucas", 87, 24.95f);
        DigitalVideoDisc dvd3 = new DigitalVideoDisc("Aladin", "Animation", 18.99f);
        DigitalVideoDisc dvd4 = new DigitalVideoDisc("Harry Potter", "Fantasy", "Chris Columbus", 120, 29.99f);
        
        Book book1 = new Book();
        book1.setTitle("The Alchemist");
        book1.setCategory("Fiction");
        book1.setCost(12.5f);
        book1.addAuthor("Paulo Coelho");

        Book book2 = new Book();
        book2.setTitle("1984");
        book2.setCost(15.0f);
        book2.addAuthor("George Orwell");
        
        CompactDisc cd1 = new CompactDisc("Adele-30", "Music", "Adele", 150.5f);
        Track track1 = new Track("Easy on Me", 224);
        Track track2 = new Track("Cry Your Heart Out", 200);
        cd1.addTrack(track1);
        cd1.addTrack(track2);

        CompactDisc cd2 = new CompactDisc("Taylor-Swift-Midnights", "Music", "Taylor Swift", 130.0f);
        Track track3 = new Track("Anti-Hero", 210);
        Track track4 = new Track("Lavender Haze", 195);
        Track track5 = new Track("Midnight Rain", 180);
        cd2.addTrack(track3);
        cd2.addTrack(track4);
        cd2.addTrack(track5);

        store.addMedia(dvd1);
        store.addMedia(dvd2);
        store.addMedia(dvd3);
        store.addMedia(dvd4);

        store.addMedia(book1);
        store.addMedia(book2);

        store.addMedia(cd1);
        store.addMedia(cd2);
    }
}