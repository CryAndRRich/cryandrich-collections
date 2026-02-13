public class MyValue {
    public int value;
    public MyValue(int value) {
        this.value = value;
    }
    
    public int getValue() {
        return value;
    }

    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }

        if (getClass() != obj.getClass()) {
            return false;
        }

        MyValue other = (MyValue) obj;
        return this.value == other.value;
    }
}
