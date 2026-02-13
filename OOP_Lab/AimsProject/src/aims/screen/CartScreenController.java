package aims.screen;

import aims.cart.Cart;
import aims.exception.PlayerException;
import aims.media.Media;
import aims.media.Playable;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.collections.ListChangeListener;
import javafx.collections.transformation.FilteredList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;

public class CartScreenController {
    private Cart cart;

    @FXML
    private TableView<Media> tblMedia;

    @FXML
    private TableColumn<Media, String> colMediaTitle;

    @FXML
    private TableColumn<Media, String> colMediaCategory;

    @FXML
    private TableColumn<Media, Float> colMediaCost;

    @FXML
    private Button btnPlay;

    @FXML
    private Button btnRemove;
    
    @FXML
    private TextField tfFilter;

    @FXML
    private RadioButton radioBtnFilterId;

    @FXML
    private RadioButton radioBtnFilterTitle;

    @FXML
    private ToggleGroup filterCategory;
    
    @FXML
    private Label lblTotalCost;

    private FilteredList<Media> filteredData; 

    public CartScreenController(Cart cart) {
        super();
        this.cart = cart;
    }

    @FXML
    private void initialize() {
        colMediaTitle.setCellValueFactory(new PropertyValueFactory<Media, String>("title"));
        colMediaCategory.setCellValueFactory(new PropertyValueFactory<Media, String>("category"));
        colMediaCost.setCellValueFactory(new PropertyValueFactory<Media, Float>("cost"));

        filteredData = new FilteredList<>(this.cart.getItemsOrdered(), p -> true);

        tblMedia.setItems(filteredData);

        btnPlay.setVisible(false);
        btnRemove.setVisible(false);

        tblMedia.getSelectionModel().selectedItemProperty().addListener(
            new ChangeListener<Media>() {
                @Override
                public void changed(ObservableValue<? extends Media> observable, Media oldValue, Media newValue) {
                    if (newValue != null) {
                        updateButtonBar(newValue);
                    }
                }
            }
        );

        tfFilter.textProperty().addListener(new ChangeListener<String>() {
            @Override
            public void changed(ObservableValue<? extends String> observable, String oldValue, String newValue) {
                showFilteredMedia(newValue);
            }
        });
        
        cart.getItemsOrdered().addListener(new ListChangeListener<Media>() {
            @Override
            public void onChanged(Change<? extends Media> c) {
                updateTotalCost();
            }
        });
        
        updateTotalCost();
    }

    private void updateTotalCost() {
        lblTotalCost.setText(cart.totalCost() + " $");
    }

    private void updateButtonBar(Media media) {
        btnRemove.setVisible(true);
        if (media instanceof Playable) {
            btnPlay.setVisible(true);
        } else {
            btnPlay.setVisible(false);
        }
    }

    private void showFilteredMedia(String keyword) {
        String newKeyword = keyword.toLowerCase();
        filteredData.setPredicate(media -> {
            if (newKeyword == null || newKeyword.isEmpty()) {
                return true;
            }
            if (radioBtnFilterId.isSelected()) {
                return String.valueOf(media.getId()).contains(newKeyword);
            } else {
                return media.getTitle().toLowerCase().contains(newKeyword);
            }
        });
    }

    @FXML
    private void btnRemovePressed(ActionEvent event) {
        Media media = tblMedia.getSelectionModel().getSelectedItem();
        cart.removeMedia(media); 
    }

    @FXML
    private void btnPlaceOrderPressed(ActionEvent event) {
        Alert alert = new Alert(Alert.AlertType.INFORMATION);
        alert.setTitle("Order Notification");
        alert.setHeaderText(null);
        alert.setContentText("Order created successfully");
        alert.showAndWait();
        
        cart.getItemsOrdered().clear(); 
    }

    @FXML
    private void btnPlayPressed(ActionEvent event) {
        Media media = tblMedia.getSelectionModel().getSelectedItem();
        try {
            ((Playable) media).play();
            
            Alert alert = new Alert(Alert.AlertType.INFORMATION);
            alert.setTitle("Playing Media");
            alert.setHeaderText("Playing: " + media.getTitle());
            alert.setContentText("Media is now playing...");
            alert.showAndWait();
            
        } catch (PlayerException e) {
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setTitle("Error Playing Media");
            alert.setHeaderText("Cannot play this media");
            alert.setContentText(e.getMessage());
            alert.showAndWait();
        }
    }
}