import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.TextField;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateTimeController {
    @FXML
    private TextField tfDisplay;

    public void showDateTime(ActionEvent event) {
        System.out.println("Get time!");

        Date now = new Date();

        DateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        String dateTimeString = df.format(now);

        tfDisplay.setText(dateTimeString);
    }
}