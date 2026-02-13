import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;

public class PropBinding {
    private String characterName;
    private String actorName;

    public PropBinding(String characterName, String actorName) {
        this.characterName = characterName;
        this.actorName = actorName;
    }

    public String getCharacterName() {
        return characterName;
    }

    public void setCharacterName(String characterName) {
        this.characterName = characterName;
    }

    public String getActorName() {
        return actorName;
    }

    public void setActorName(String actorName) {
        this.actorName = actorName;
    }

    public void displayInfo() {
        System.out.println("The role of " + characterName + " will be played by " + actorName);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            JFrame frame = new JFrame("PropBinding");
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.setSize(400, 200);
            frame.setLocationRelativeTo(null);

            JPanel panel = new JPanel(new GridLayout(3, 2, 10, 10));
            panel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

            JLabel charLabel = new JLabel("Character Name:");
            JTextField charField = new JTextField(15);
            JLabel actorLabel = new JLabel("Actor Name:");
            JTextField actorField = new JTextField(15);

            JButton submitBtn = new JButton("Submit");
            JLabel resultLabel = new JLabel("");

            submitBtn.addActionListener((ActionEvent e) -> {
                PropBinding binding = new PropBinding(charField.getText(), actorField.getText());
                binding.displayInfo();
                resultLabel.setText("The role of " + charField.getText() + " will be played by " + actorField.getText());
            });

            panel.add(charLabel);
            panel.add(charField);
            panel.add(actorLabel);
            panel.add(actorField);
            panel.add(submitBtn);
            panel.add(resultLabel);

            frame.add(panel);
            frame.setVisible(true);
        });
    }
}
