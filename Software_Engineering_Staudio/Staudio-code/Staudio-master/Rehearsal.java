import org.w3c.dom.Text;

import java.util.ArrayList;

public class Rehearsal extends Reservation {
    // Variables
    private Client client;
    private Studio studio;
    private Room room;
    private float costPerHour;
    private Text comments;
    private String startDate;
    private String endDate;

    // Construstor
    public Rehearsal(int reservationId, Client client, Studio studio, Room room, boolean confirmed, float costPerHour, Text comments, String startDate, String endDate) {
        super(reservationId, client, studio, room, startDate, confirmed, new ArrayList<Equipment>());
        this.costPerHour = costPerHour;
        this.comments = comments;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    // Setters - Getters
    public Client getClient() { return client; }
    public void setClient(Client client) { this.client = client; }
    public Studio getStudio() { return studio; }
    public void setStudio(Studio studio) { this.studio = studio; }
    public Room getRoom() { return room; }
    public void setRoom(Room room) { this.room = room; }
    public float getCostPerHour() {
        return costPerHour;
    }
    public void setCostPerHour(float costPerHour) {
        this.costPerHour = costPerHour;
    }
    public Text getComments() {
        return comments;
    }
    public void setComments(Text comments) {
        this.comments = comments;
    }
    public String getStartDate() {
        return startDate;
    }
    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }
    public String getEndDate() {
        return endDate;
    }
    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    @Override
    public String toString() {
        String str = "";

        str += "Client: " + client.getName() + " " + client.getLastName() + "\n";
        str += "Studio: " + studio.getStudioName() + "\n";
        str += "Room: " + room.getRoomId() + "\n";
        str += "Cost/hour: " + room.getCost() + "\n";
        str += "Date: " + startDate + "\n";

        return str;
    }

}
