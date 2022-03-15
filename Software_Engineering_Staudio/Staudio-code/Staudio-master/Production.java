import java.util.ArrayList;

public class Production extends Reservation{
    // Variables
    public enum type{miniAlbum,song,fullAlbum}
    private type prodType;
    private String startDay;
    private String endDay;
    private Producer producer;
    private float costPerMeeting;
    private boolean status;

    // Constructors
    public Production(int reservationId, Client client, Studio studio, boolean confirmed, type prodType, String startDay, Producer producer, float costPerMeeting, boolean status) {
        super(reservationId, client, studio, null, startDay, confirmed, null);
        this.prodType = prodType;
        this.startDay = startDay;
        this.endDay = "";
        this.producer = producer;
        this.costPerMeeting = costPerMeeting;
        this.status = status;
        client.getHistory().add(this);
        producer.setProduction(this);
    }

    // Setters - Getters
    public String getStartDay() {
        return startDay;
    }
    public void setStartDay(String startDay) {
        this.startDay = startDay;
    }
    public String getEndDay() {
        return endDay;
    }
    public void setEndDay(String endDay) {
        this.endDay = endDay;
    }
    public Producer getProducer() { return producer; }
    public void setProducerId(Producer producer) { this.producer = producer; }
    public float getCostPerMeeting() { return costPerMeeting; }
    public void setCostPerMeeting(float costPerMeeting) { this.costPerMeeting = costPerMeeting; }
    public boolean getProductionStatus() { return this.status; }
    public void setProductionStatus(boolean status) { this.status = status; }
    public void printProductionInfo() { System.out.println(this.toString()); }

    @Override
    public String toString() {
        String str = "";

        str += super.toString().replaceAll("Reservation", "Production");
        str += "Production type: " + this.prodType + "\n";
        str += "Production start day: " + this.startDay + "\n";
        str += "Production end day: " + this.endDay + "\n";
        str += "Production producer: " + this.producer.getProducerId() + "\n";
        str += "Production cost per day: " + this.costPerMeeting + "\n";
        return str;
    }

    public static ArrayList<String> getProductionTypeList() {
        ArrayList<String> list = new ArrayList<>();

        for(int i=0; i<type.values().length; ++i) {
            list.add(type.values()[i].toString());
        }

        return list;
    }
}
