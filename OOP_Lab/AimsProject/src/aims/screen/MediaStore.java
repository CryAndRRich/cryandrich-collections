package aims.screen;

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

import aims.cart.Cart;
import aims.exception.PlayerException;
import aims.exception.LimitExceededException;
import aims.media.*;

public class MediaStore extends JPanel {
    private Media media;
    private Cart cart; 

    public MediaStore(Media media, Cart cart) {
        this.media = media;
        this.cart = cart;
        this.setLayout(new BoxLayout(this, BoxLayout.Y_AXIS));

        JLabel title = new JLabel(media.getTitle());
        title.setFont(new Font(title.getFont().getName(), Font.PLAIN, 20));
        title.setAlignmentX(CENTER_ALIGNMENT);

        JLabel cost = new JLabel("" + media.getCost() + " $");
        cost.setAlignmentX(CENTER_ALIGNMENT);

        JPanel container = new JPanel();
        container.setLayout(new FlowLayout(FlowLayout.CENTER));

        JButton btnAdd = new JButton("Add to cart");
        btnAdd.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    cart.addMedia(media);
                    
                    JOptionPane.showMessageDialog(null, 
                        media.getTitle() + " has been added to cart");
                        
                } catch (LimitExceededException ex) {
                    JOptionPane.showMessageDialog(null, 
                        ex.getMessage(), 
                        "Cart is full", 
                        JOptionPane.ERROR_MESSAGE);
                }
            }
        });
        container.add(btnAdd);

        if (media instanceof Playable) {
            JButton btnPlay = new JButton("Play");
            btnPlay.addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    try {
                        ((Playable) media).play();
                        
                        JDialog playDialog = new JDialog();
                        playDialog.setTitle("Playing Media");
                        playDialog.setSize(300, 200);
                        playDialog.setLayout(new FlowLayout());
                        playDialog.add(new JLabel("Playing: " + media.getTitle()));
                        playDialog.setVisible(true);
                        
                    } catch (PlayerException ex) {
                        JOptionPane.showMessageDialog(null, ex.getMessage(), "Illegal Media Length", JOptionPane.ERROR_MESSAGE);
                    }
                }
            });
            container.add(btnPlay);
        }

        this.add(Box.createVerticalGlue());
        this.add(title);
        this.add(cost);
        this.add(Box.createVerticalGlue());
        this.add(container);

        this.setBorder(BorderFactory.createLineBorder(Color.BLACK));
    }
}