import java.lang.reflect.Array;
import java.util.ArrayList;

public class Recording extends Reservation {
    // Variables
    public enum type{laiko,rock,tsifteteli,punk,hiphop,psalmodia}
    private type recType;
    private float costPerHour;
    private String startDate;
    private String endDate;
    private String comment;



    // Constructors
    public Recording(int reservationId, Client client, Studio studio, boolean confirmed, type recType, Equipment equip, float costPerHour, String startDate, String comment) {
        super(reservationId, client, studio, null, startDate, confirmed, new ArrayList<Equipment>());
        this.recType = recType;
        this.costPerHour = costPerHour;
        this.startDate = startDate;
        this.comment = comment;
        this.equip = equip;
    }

    // Setters - Getters
    public type getRecType() { return recType; }
    public void setRecType(type recType) { this.recType = recType; }
    public float getCostPerHour() {
        return costPerHour;
    }
    public void setCostPerHour(float costPerHour) {
        this.costPerHour = costPerHour;
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

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public static ArrayList<String> getRecordingTypeList() {
        ArrayList<String> list = new ArrayList<String>();

        for(int i = 0; i < type.values().length; ++i) {
            list.add(type.values()[i].toString());
        }

        return list;
    }

    public Equipment getEquip() {
        return equip;
    }

    public void setEquip(Equipment equip) {
        this.equip = equip;
    }

    private Equipment equip;

}
