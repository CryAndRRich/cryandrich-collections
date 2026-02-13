import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Random;

public class GarbageCreator {
    public static void main(String[] args) {
        String filename = "OtherProjects/garbage/test.exe";
        int sizeInMB = 20; 

        try (FileOutputStream fos = new FileOutputStream(filename)) {
            byte[] buffer = new byte[1024 * 1024]; 
            Random random = new Random();

            for (int i = 0; i < sizeInMB; i++) {
                random.nextBytes(buffer);
                fos.write(buffer);
            }

            System.out.println("File '" + filename + "' created (" + sizeInMB + " MB)");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}