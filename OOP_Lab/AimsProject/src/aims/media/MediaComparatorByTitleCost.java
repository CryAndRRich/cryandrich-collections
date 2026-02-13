package aims.media;

import java.util.Comparator;

public class MediaComparatorByTitleCost implements Comparator<Media> {
    @Override
    public int compare(Media m1, Media m2) {
        String title1 = m1.getTitle();
        String title2 = m2.getTitle();
        
        int titleComparison = title1.compareTo(title2);
        if (titleComparison != 0) {
            return titleComparison;
        }
        
        return Float.compare(m2.getCost(), m1.getCost());
    }
}