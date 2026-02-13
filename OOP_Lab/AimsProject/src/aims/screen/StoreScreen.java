package aims.screen;

import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;
import javax.swing.*;

import aims.store.Store;
import aims.cart.Cart;
import aims.media.*;

public class StoreScreen extends JFrame {
    private Store store;
    private Cart cart;
    
    public StoreScreen(Store store, Cart cart) {
        this.store = store;
        this.cart = cart;
        
        Container cp = getContentPane();
        cp.setLayout(new BorderLayout());

        cp.add(createNorth(), BorderLayout.NORTH);
        cp.add(createCenter(), BorderLayout.CENTER);

        setVisible(true);
        setTitle("Store");
        setSize(1024, 768);
    }

    JPanel createNorth() {
        JPanel north = new JPanel();
        north.setLayout(new BoxLayout(north, BoxLayout.Y_AXIS));
        north.add(createMenuBar());
        north.add(createHeader());
        return north;
    }

    JMenuBar createMenuBar() {
        JMenu menu = new JMenu("Options");

        JMenu smUpdateStore = new JMenu("Update Store");
        
        JMenuItem addBook = new JMenuItem("Add Book");
        addBook.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                new AddBookToStoreScreen(store, cart);
                dispose(); 
            }
        });
        smUpdateStore.add(addBook);

        JMenuItem addCD = new JMenuItem("Add CD");
        addCD.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                new AddCompactDiscToStoreScreen(store, cart);
                dispose();
            }
        });
        smUpdateStore.add(addCD);

        JMenuItem addDVD = new JMenuItem("Add DVD");
        addDVD.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                new AddDigitalVideoDiscToStoreScreen(store, cart);
                dispose();
            }
        });
        smUpdateStore.add(addDVD);

        menu.add(smUpdateStore);
        
        menu.add(new JMenuItem("View store"));
        
        JMenuItem viewCart = new JMenuItem("View cart");
        viewCart.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                new CartScreen(cart);
            }
        });
        menu.add(viewCart);

        JMenuBar menuBar = new JMenuBar();
        menuBar.setLayout(new FlowLayout(FlowLayout.LEFT));
        menuBar.add(menu);

        return menuBar;
    }

    JPanel createHeader() {
        JPanel header = new JPanel();
        header.setLayout(new BoxLayout(header, BoxLayout.X_AXIS));

        JLabel title = new JLabel("AIMS");
        title.setFont(new Font(title.getFont().getName(), Font.PLAIN, 50));
        title.setForeground(Color.CYAN);

        JButton cartBtn = new JButton("View cart");
        cartBtn.setPreferredSize(new Dimension(100, 50));
        cartBtn.setMaximumSize(new Dimension(100, 50));
        cartBtn.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                new CartScreen(cart);
            }
        });

        header.add(Box.createRigidArea(new Dimension(10, 10)));
        header.add(title);
        header.add(Box.createHorizontalGlue());
        header.add(cartBtn);
        header.add(Box.createRigidArea(new Dimension(10, 10)));

        return header;
    }

    JPanel createCenter() {
        JPanel center = new JPanel();
        center.setLayout(new GridLayout(3, 3, 2, 2));

        ArrayList<Media> mediaInStore = store.getItemsInStore();
        for (int i = 0; i < 9; i++) {
            if (i < mediaInStore.size()) {
                MediaStore cell = new MediaStore(mediaInStore.get(i), this.cart);
                center.add(cell);
            }
        }

        return center;
    }
    
    public static void main(String[] args) {
        Store store = new Store();
        Cart cart = new Cart();
        
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
        
        new StoreScreen(store, cart);
    }
}