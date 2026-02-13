import java.awt.*;
import java.awt.event.*;

public class MouseEventDemo extends Frame {
    TextField tfMouseX; 
    TextField tfMouseY;
    
    TextField tfMousePositionX; 
    TextField tfMousePositionY;

    public MouseEventDemo() {
        setLayout(new FlowLayout()); 

        add(new Label("X-Click: "));
        tfMouseX = new TextField(10);
        tfMouseX.setEditable(false);
        add(tfMouseX);

        add(new Label("Y-Click: "));
        tfMouseY = new TextField(10);
        tfMouseY.setEditable(false);
        add(tfMouseY);

        add(new Label("X-Position: "));
        tfMousePositionX = new TextField(10); 
        tfMousePositionX.setEditable(false);
        add(tfMousePositionX);

        add(new Label("Y-Position: "));
        tfMousePositionY = new TextField(10); 
        tfMousePositionY.setEditable(false);
        add(tfMousePositionY);

        addMouseListener(new MyMouseListener(this));
        addMouseMotionListener(new MyMouseMotionListener(this));

        setTitle("MouseEvent Demo");
        setSize(450, 150);
        setVisible(true);
        
        addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                System.exit(0);
            }
        });
    }

    public static void main(String[] args) {
        new MouseEventDemo();
    }
}