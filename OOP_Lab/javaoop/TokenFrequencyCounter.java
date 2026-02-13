import java.util.*;

public class TokenFrequencyCounter {
    public static void main(String[] args) {
        String input = String.join(" ", args);

        if (input.trim().isEmpty()) {
            System.out.println("{}");
            return;
        }

        String[] tokens = input.split("\\s+");

        Map<String, Integer> freq = new HashMap<>();
        for (String t : tokens) {
            String key = t.toLowerCase();
            freq.put(key, freq.getOrDefault(key, 0) + 1);
        }

        List<String> keys = new ArrayList<>(freq.keySet());
        Collections.sort(keys);

        StringBuilder sb = new StringBuilder();
        sb.append("{");
        for (int i = 0; i < keys.size(); i++) {
            String k = keys.get(i);
            sb.append(k);
            sb.append(" = ");
            sb.append(freq.get(k));
            if (i < keys.size() - 1) {
                sb.append(", ");
            }
        }
        sb.append("}");

        System.out.println(sb.toString());
    }
}
