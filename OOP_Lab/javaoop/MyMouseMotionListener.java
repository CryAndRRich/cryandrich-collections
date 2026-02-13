import java.awt.event.*;

public class MyMouseMotionListener implements MouseMotionListener {
    MouseEventDemo app;

    public MyMouseMotionListener(MouseEventDemo app) {
        this.app = app;
    }

    @Override
    public void mouseMoved(MouseEvent e) {
        app.tfMousePositionX.setText(String.valueOf(e.getX()));
        app.tfMousePositionY.setText(String.valueOf(e.getY()));
    }

    @Override
    public void mouseDragged(MouseEvent e) {
        app.tfMousePositionX.setText(String.valueOf(e.getX()));
        app.tfMousePositionY.setText(String.valueOf(e.getY()));
    }
}