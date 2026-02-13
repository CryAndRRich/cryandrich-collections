package aims.exception;

public class LimitExceededException extends Exception {
    public LimitExceededException() {
        super();
    }

    public LimitExceededException(String message) {
        super(message);
    }
}