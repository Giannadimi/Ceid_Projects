import java.util.ArrayList;
import java.util.Scanner;

public class Owner extends User{
    // Variables
    private int ownerId;
    private ArrayList<Studio> partnerStudios;
    private ArrayList<Reservation> reservations;

    // Constructors
    public Owner(String name, String lastName, String phone, String email, String password, int ownerId) {
        super(name, lastName, phone, email, password);
        this.ownerId = ownerId;
        this.partnerStudios = new ArrayList<Studio>();
        this.reservations = new ArrayList<Reservation>();
    }

    // Setters - Getters
    public void setOwnerId(int ownerId) { this.ownerId = ownerId; }
    public int getOwnerId() { return ownerId; }
    public ArrayList<Studio> getPartnerStudios() {
        return partnerStudios;
    }
    public Studio getPartnerStudio(int studioId) {
        for(Studio s : this.partnerStudios) {
            if(s.getStudioId() == studioId) {
                return s;
            }
        }
        return null;
    }
    public boolean setPartnerStudio(Studio stud) {
        if(getPartnerStudio(stud.getStudioId()) != null) {
            return false;
        }
        return this.partnerStudios.add(stud) && stud.setPartnerOwner(this);
    }
    public boolean deleteStudio(int studioId) {
        Studio s = getPartnerStudio(studioId);
        if(s == null)
            return false;
        else {
            this.partnerStudios.remove(s);
        }
        return false;
    }
    public ArrayList<Reservation> getReservations() {
        return reservations;
    }
    public Reservation getReservation(int reservationId) {
        for(Reservation r : this.reservations) {
            if(r.getReservationId() == reservationId) {
                return r;
            }
        }
        return null;
    }
    public boolean setReservation(Reservation res) {
        if(getReservation(res.getReservationId()) != null) {
            return false;
        }
        reservations.add(res);
        return true;
    }
    public boolean deleteReservation(int reservationId) {
        Reservation res = getReservation(reservationId);
        if(res == null) {
            return false;
        }
        else {
            reservations.remove(res);
        }
        return true;
    }
    /*public void manageResevation(Studio studio,Client client, Reservation reservation,Room room, boolean pending, boolean accept) {
        for (Studio i : this.getPartnerStudios()) {
            if (i.getStudioId() == studio.getStudioId()) {
                for (Reservation j : i.getReservations()) {
                    if (j.getReservationId() == reservation.getReservationId()) {
                        if (j.isConfirmed() == pending && accept == true) {
                            if(accept==true )
                                j.setConfirmed(true);
                            else //diagrafo th krathsh
                                i.getReservations().remove(reservation); //remove ekei pou einai to rese toso

                            Reservation res = new Reservation(reservation.getReservationId(), client, studio, room, pending);
                            this.reservations.add(res);
                        } //else if ()
                    }
                }
            }
        }
    }
    public void makeOwnOffer(int offerId, Studio studio, int numOfReservs, int free , Offer.type recType, boolean state) {
            for(Studio i:this.getPartnerStudios()){
                if(i.getStudioId()==studio.getStudioId()){
                    Offer offer = new Offer(offerId, studio, numOfReservs, free, recType, state);
                    i.getOffers().add(offer);
                    return;
                }
            }
    }
    public void addOffer(int studioId,Offer offer,boolean state){
        for(Studio i:this.getPartnerStudios()){
            if(i.getStudioId()==studioId){
                i.setOffer(offer);
            }
        }
    }*/

    @Override
    public String toString() {
        String str="";
        str += "Owner ID: " + this.ownerId + "\n";
        String tempStr = super.toString().replaceAll("User", "Owner");
        str += tempStr;

        str += "\n";

        return str;
    }

    public void printOwnerStudios() {
        for(Studio s : this.partnerStudios) {
            System.out.println("\tStudio ID: " + s.getStudioId() + ", Name: " + s.getStudioName() + "\n");
        }
    }







}
