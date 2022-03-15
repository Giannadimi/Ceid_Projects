import java.util.ArrayList;

public class Reservation {
    // Variables
    private int reservationId;
    private Client client;
    private Studio studio;
    private boolean confirmed;
    private Room room;
    private static int autoInc = 0;
    private ArrayList<Equipment> equipmentList;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    private String date;

    // Constructors
    public Reservation(int reservationId, Client client, Studio studio, Room room, String date, boolean confirmed, ArrayList<Equipment> equipmentList) {
        this.reservationId = reservationId;
        this.client = client;
        this.studio = studio;
        this.room = room;
        this.confirmed = confirmed;
        this.equipmentList = equipmentList;
        this.date = date;
        this.client.getHistory().add(this);
        this.studio.setReservation(this);
    }

    // Seters - Getters
    public ArrayList<Equipment> getEquipmentList() {
        return equipmentList;
    }

    public Equipment getEquipment(int equipmentID) {
        for (Equipment e : this.equipmentList) {
            if (e.getMusInsId() == equipmentID) {
                return e;
            }
        }
        return null;
    }

    public boolean setEquipment(Equipment eq) {
        if (getEquipment(eq.getMusInsId()) != null) {
            return false;
        }
        this.equipmentList.add(eq);
        return true;
    }

    public boolean deleteEquipment(int equipmentId) {
        Equipment eq = getEquipment(equipmentId);
        if (eq == null) {
            return false;
        }
        this.equipmentList.remove(eq);
        return true;
    }

    public int getReservationId() {
        return reservationId;
    }

    public void setReservationId(int reservationId) {
        this.reservationId = reservationId;
    }

    public Client getClient() {
        return this.client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Studio getStudio() {
        return this.studio;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public Room getRoom() {
        return this.room;
    }

    public void setStudio(Studio studio) {
        this.studio = studio;
    }

    public boolean isConfirmed() {
        return confirmed;
    }

    public void setConfirmed(boolean confirmed) {
        this.confirmed = confirmed;
    }


    @Override
    public String toString() {
        String str = "";
        str += "Reservation ID: " + reservationId + "\n";
        str += "Reservation Client: " + this.client.getClientId() + "\n";
        str += "Reservation Studio: " + this.studio.getStudioId() + "\n";
        str += (this.room != null) ? "Reservation Room: " + this.room.getRoomId() + "\n" : "";
        str += this.date + "\n";
        str += "Reservation Confirmed: " + this.confirmed + "\n";
        if (this.equipmentList != null){
            str += "Reservation equipment:\n";
            for (Equipment e : this.equipmentList) {
                str += "\tEquipment ID: " + e.getMusInsId() + "\n";
            }
        }
        return str;
    }

    public void printReservationInfo() { System.out.println(this.toString()); }

    public static int idAutoIncrement() { return ++autoInc; }

}
