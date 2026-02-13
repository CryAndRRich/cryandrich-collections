package aims.media;
import aims.exception.PlayerException;

public class Track implements Playable {
    private String title;
    private int length;

    public Track(String title, int length) {
        this.title = title;
        this.length = length;
    }

    public String getTitle() {
        return title;
    }

    public int getLength() {
        return length;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null || !(obj instanceof Track)) {
            return false;
        }
        
        Track other = (Track) obj;
        if (this.title != null) {
            return this.title.equals(other.title) && this.length == other.length;
        }
        return false;
    }

    @Override
    public void play() throws PlayerException {
        if (this.getLength() > 0) {
            System.out.println("Playing path: " + this.getTitle());
            System.out.println("Path length: " + this.getLength());
        } else {
            throw new PlayerException("ERROR: Track length is non-positive!");
        }
    }
}