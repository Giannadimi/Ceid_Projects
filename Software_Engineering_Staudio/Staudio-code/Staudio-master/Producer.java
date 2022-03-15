import java.util.ArrayList;
import java.util.Scanner;


public class Producer extends User {
    // Variables
    private int producerId ;
    private boolean status;
    private int rating;
    private ArrayList<Studio> partnerStudios;
    private ArrayList<Production> productions;

    // Constructors
    public Producer(String name, String lastName, String phone, String email, String password, int producerId, boolean status, int rating) {
        super(name, lastName, phone, email, password);
        this.producerId = producerId;
        this.status = status;
        this.rating = rating;
        this.partnerStudios = new ArrayList<Studio>();
        this.productions = new ArrayList<Production>();
    }

    // Setters - Getters
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
            System.out.println("FAIL!!!!!!! " + this.getProducerId());
            return false;
        }
        return this.partnerStudios.add(stud) && stud.setPartnerProducer(this);
    }
    public boolean deletePartnerStudio(int studioId) {
        Studio stud = getPartnerStudio(studioId);
        if(stud == null) {
            return false;
        }
        this.partnerStudios.remove(stud);
        return true;
    }
    public ArrayList<Production> getProductions() { return productions; }
    public Production getProduction(int productionId) {
        for(Production p : this.productions) {
            if(p.getReservationId() == productionId) {
                return p;
            }
        }
        return null;
    }
    public boolean setProduction(Production prod) {
        if(getProduction(prod.getReservationId()) != null) {
            return false;
        }
        this.productions.add(prod);
        return true;
    }
    public boolean deleteProduction(int productionID) {
        Production prod = getProduction(productionID);
        if(prod == null) {
            return false;
        }
        this.productions.remove(prod);
        return true;
    }
    public int getProducerId() {
        return producerId;
    }
    public void setProducerId(int producerId) {
        this.producerId = producerId;
    }
    public boolean isStatus() {
        return status;
    }
    public void setStatus(boolean status) {
        this.status = status;
    }
    public int getRating() {
        return rating;
    }
    public void setRating(int rating) {
        this.rating = rating;
    }

    @Override
    public String toString() {
        String str = "";
        str += "Producer ID: " + this.getProducerId() + "\n";
        String tempStr = super.toString().replaceAll("User", "Producer");
        str += tempStr;
        str += "Producer status: " + this.isStatus() + "\n";
        str += "Producer rating: " + this.getRating() + "\n";
        str += "Producer partner studios:\n";
        for(Studio s : this.partnerStudios) {
            str += "\tStudio ID: " + s.getStudioId() + ", Studio adress: " + s.getAddress() + ", Phone: " + s.getPhone() + "\n";
        }

        return str;
    }

    public void printWork() {
        String str = "";

        for(Production p : this.productions) {
            str += "\tProduction ID: " + p.getReservationId() + ", Production studio: " + p.getStudio().getStudioId() + ", Production Confirmed: " +
                    (!p.isConfirmed() ? "No" : ("Yes" + ", Production Status: " + (p.getProductionStatus() ? "Finished" : "On progress"))) + "\n";
        }

        System.out.println(str);
    }



    public void editProducerWorkByID(int ID) {
        Production prod = null;
        Scanner keyboard = new Scanner(System.in);
        char c;

        for(Production p : this.productions) {
            if(p.getReservationId() == ID) {
                prod = p;
                break;
            }
        }

        if(prod == null) {
            System.out.println("There is no production having such ID.");
            return;
        }
        if(!prod.isConfirmed()) {
            do {
                System.out.print("Confirm Production? [y/n]: ");
                c = keyboard.next().charAt(0);
                if (c == 'y')
                    prod.setConfirmed(true);
                else {
                    this.deleteProduction(ID);
                    return;
                }
            }while(c != 'y' && c != 'n');
        }
        else {
            if (!prod.getProductionStatus()) {
                do {
                    System.out.print("Finshed production? [y/n]: ");
                    c = keyboard.next().charAt(0);
                    if (c == 'y')
                        prod.setProductionStatus(true);
                } while (c != 'y' && c != 'n');
            }
        }
    }
}