public class Test {
    public static void main(String[] args) {

        MyValue a = new MyValue(10);
        MyValue b = new MyValue(10);
        MyValue c = new MyValue(20);
        MyValue d = a;

        System.out.println(a.equals(b));
        System.out.println(a.equals(c));
        System.out.println(a.equals(d));
        System.out.println(a.equals(null)); 
    }
}
