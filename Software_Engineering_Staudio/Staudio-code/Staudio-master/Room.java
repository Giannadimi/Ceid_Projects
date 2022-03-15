import java.util.ArrayList;
import java.util.Iterator;
import java.util.Objects;
import java.util.Scanner;

public class Room {
    // Variables
    private int roomId;
    public enum type {highend, rehearsal};
    private type roomType;
    public enum size {small, medium, large};
    private size roomSize;
    private int rating;
    private float cost;
    private ArrayList<String> availiableRoomDates;
    private ArrayList<Reservation> listOfReservations; //not sure

    // Constructions
    public Room(int roomId, type roomType, size roomSize, int rating, float cost) {
        this.roomId = roomId;
        this.rating = rating;
        this.cost = cost;
        this.roomType = roomType;
        this.roomSize = roomSize;
        this.availiableRoomDates = new ArrayList<String>();
        this.listOfReservations = new ArrayList<Reservation>();
    }

    // Setters - Getters
    public ArrayList<String> getAvailiableRoomDates() {
        return availiableRoomDates;
    }
    public String getAvaliableRoomDate(String date) {
        for(String s : this.availiableRoomDates) {
            if(s.equals(date)) {
                return s;
            }
        }
        return null;
    }
    public boolean setAvaliableRoomDate(String date) {
        String avalDate = getAvaliableRoomDate(date);
        if (avalDate != null) {
            return false;

        }
        this.availiableRoomDates.add(date);
        return true;
    }
    public boolean deleteAvaliableDate(String date) {
        String avalDate = getAvaliableRoomDate(date);
        if(avalDate.equals(date)) {
            this.availiableRoomDates.remove(avalDate);
            return true;
        }
        return false;
    }
    public ArrayList<Reservation> getListOfReservations() {
        return listOfReservations;
    }
    public Reservation getReservation(int resId) {
        for(Reservation r : this.listOfReservations) {
            if(r.getReservationId() == resId) {
                return r;
            }
        }
        return null;
    }
    public boolean setReservation(Reservation res) {
        if(getReservation(res.getReservationId()) == null) {
            this.listOfReservations.add(res);
            return true;
        }
        return false;
    }
    public boolean deleteReservation(int resId) {
        Reservation res = getReservation(resId);
        if(res == null) {
            return false;
        }
        this.listOfReservations.remove(res);
        return true;
    }
    public int getRoomId() {
        return roomId;
    }
    public void setRoomId(int roomId) {
        this.roomId = roomId;
    }
    public int getRating() {
        return rating;
    }
    public void setRating(int rating) {
        this.rating = rating;
    }
    public boolean checkRoomAvailiability(int studioId,String checkDate,int RoomId){
        for (String date:this.getAvailiableRoomDates()){
            if(date.equals(checkDate))return true;
        }
        return false;
    }
    public float getCost() { return this.cost; }
    public void setCost(float cost) { this.cost = cost; }
    public type getRoomType() {
        return this.roomType;
    }
    public void setRoomType(type roomType) { this.roomType = roomType; }
    public size getRoomSize() { return this.roomSize; }

    public void setRoomSize(size roomSize) {
        this.roomSize = roomSize;
    }

    public static Room makeNewRoom() {
        Scanner keyboard = new Scanner(System.in);

        int roomID;
        String roomTypeStr;
        Room.type roomType;
        String roomSizeStr;
        Room.size roomSize;
        float roomCost;
        char opt;
        String roomAvalDate;

        System.out.print("Room ID: ");
        roomID = keyboard.nextInt();
        System.out.print("Room type [highend/rehersal]: ");
        roomTypeStr = keyboard.next();
        roomType = roomTypeStr.equals("highend") ? type.highend : type.rehearsal;
        System.out.println("Size [small/medium/large]: ");
        roomSizeStr = keyboard.next();
        if(roomSizeStr.equals("small")) {
            roomSize = size.small;
        }
        else if(roomSizeStr.equals("medium")) {
            roomSize = size.medium;
        }
        else {
            roomSize = size.large;
        }
        System.out.print("Cost: ");
        roomCost = keyboard.nextFloat();

        Room r = new Room(roomID, roomType, roomSize, 0, roomCost);

        while(true) {
            System.out.print("Add avaliable date? [y/n]: ");
            opt = keyboard.next().charAt(0);

            if(opt == 'y'){
                System.out.print("Avaliable date: ");
                roomAvalDate = keyboard.next();
                r.setAvaliableRoomDate(roomAvalDate);
            }
            else if(opt == 'n'){
                break;
            }
            else {
                System.out.println("No such option.");
            }
        }

        return r;

    }

    @Override
    public String toString() {
        String str = "";

        str += "Room ID: " + this.roomId + "\n";
        str += "\tRoom type: " + (this.roomType == type.highend ? "highend" : "rehersal") + "\n";
        str += "\tRoom size: ";
        if(this.roomSize == size.small) {
            str += "small";
        }
        else if(this.roomSize == size.medium) {
            str += "medium";
        }
        else {
            str += "large";
        }
        str += "\n";
        str += "\tRoom rating: " + this.rating + "\n";
        str += "\tRoom cost: " + this.cost + "\n";

        return str;
    }

    public String getAvaliableDatesString() {

        String str = "";
        int i = 0;

        str += "Room avaliable dates:" + "\n";
        for(String s : this.availiableRoomDates) {
            ++i;
            str += "\t" + i + ") " + s + "\n";
        }

        return str;
    }
}
