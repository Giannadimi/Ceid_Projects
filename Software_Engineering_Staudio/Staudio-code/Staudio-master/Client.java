import java.util.ArrayList;

public class Client extends User{
    // Variables
    private int clientId;
    private ArrayList<Reservation> history;

    //Constructors
    public Client(String name, String lastName, String phone, String email, String password, int clientId) {
        super(name, lastName, phone, email, password);
        this.clientId = clientId;
        this.history=new ArrayList<>();
    }

    // Setters - Getters
    public ArrayList<Reservation> getHistory() { return history; }

    public int getClientId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
    }

    @Override
    public String toString() {
        String str = "";
        String tempStr = "";

        str += "Client ID: " + this.getClientId() + "\n";
        tempStr = super.toString().replaceAll("User", "Client");
        str += tempStr;
        str += "History:\n";
        for(Reservation r : this.history) {
            str += "\tReservation id: " + r.getReservationId() + ", StudioId: " + r.getStudio().getStudioId() + ", Confirmed: " + r.isConfirmed() + "\n";
        }

        return str;
    }
    public void rate(Studio studio, int soundRating, int environmentRating, int staffRating) {

        if(!checkRating(soundRating)){
            return;
        }
        if(!checkRating(environmentRating)){
            return;
        }
        if(!checkRating(staffRating)){
            return;
        }
        studio.setOverallRating((soundRating+environmentRating+staffRating)/3);

    }
    private boolean checkRating(int rating) {
        if ((rating <= 5) && (rating >= 1)) {
            return true;
        }
        return false;
    }

}

//    public Reservation getHistoryReservation(int resId) {
//        for(Reservation r : this.history) {
//            if(r.getReservationId() == resId) {
//                return r;
//            }
//        }
//        return null;
//    }


//    public boolean setHistoryReservation(Reservation res) {
//        if(getHistoryReservation(res.getReservationId()) != null) {
//            return false;
//        }
//        this.history.add(res);
//        return true;
//    }

//    public boolean deleteHistoryReservation(int resId) {
//        Reservation res = getHistoryReservation(resId);
//        if(res == null) {
//            return false;
//        }
//        this.history.remove(res);
//        return true;
//    }
