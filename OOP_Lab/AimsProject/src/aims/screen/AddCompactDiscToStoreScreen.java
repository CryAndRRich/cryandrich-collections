package aims.screen;

import javax.swing.*;

import aims.cart.Cart;
import aims.media.CompactDisc;
import aims.store.Store;

public class AddCompactDiscToStoreScreen extends AddItemToStoreScreen {
    private JTextField tfArtist;

    public AddCompactDiscToStoreScreen(Store store, Cart cart) {
        super(store, cart);
        setTitle("Add CD to Store");
    }

    @Override
    protected void addSpecificFields(JPanel center) {
        center.add(new JLabel("Artist:"));
        tfArtist = new JTextField();
        center.add(tfArtist);
    }

    @Override
    protected void addItemToStore() {
        String title = tfTitle.getText();
        String category = tfCategory.getText();
        String artist = tfArtist.getText();
        float cost = 0;

        try {
            cost = Float.parseFloat(tfCost.getText());
        } catch (NumberFormatException e) {
            JOptionPane.showMessageDialog(this, "Cost must be a valid number", "Error", JOptionPane.ERROR_MESSAGE);
            return;
        }

        CompactDisc cd = new CompactDisc(title, category, artist, cost);
        
        store.addMedia(cd);
        JOptionPane.showMessageDialog(this, "CD added successfully");
        
        tfTitle.setText("");
        tfCategory.setText("");
        tfCost.setText("");
        tfArtist.setText("");
    }
}