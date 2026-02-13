import java.awt.event.*;

public class MyMouseListener implements MouseListener {
    MouseEventDemo app;

    public MyMouseListener(MouseEventDemo app) {
        this.app = app;
    }

    @Override
    public void mouseClicked(MouseEvent e) {
        System.out.println("Mouse-button clicked (pressed and released)!");
        
        app.tfMouseX.setText(String.valueOf(e.getX()));
        app.tfMouseY.setText(String.valueOf(e.getY()));
    }

    @Override
    public void mousePressed(MouseEvent e) {
        System.out.println("Mouse-button pressed!");
    }

    @Override
    public void mouseReleased(MouseEvent e) {
        System.out.println("Mouse-button released!");
    }

    @Override
    public void mouseEntered(MouseEvent e) {
        System.out.println("Mouse-pointer entered the source component");
    }

    @Override
    public void mouseExited(MouseEvent e) {
        System.out.println("Mouse exited-pointer the source component!");
    }
}