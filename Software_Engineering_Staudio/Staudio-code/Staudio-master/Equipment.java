import java.util.ArrayList;
import java.util.Scanner;

public class Equipment {
    private int musInsId;
    private String name;
    public enum type{violi,klarino,kithara,baglamas,drums,fysarmonika};
    private type equipType;
    private ArrayList<String> availiableMusInsDates;

    public Equipment(int musInsId, String name, type equipType) {
        this.musInsId = musInsId;
        this.name = name;
        this.equipType = equipType;
        this.availiableMusInsDates = new ArrayList<String>();
    }

    public int getMusInsId() {
        return musInsId;
    }

    public void setMusInsId(int musInsId) {
        this.musInsId = musInsId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public type getEquipType() {
        return equipType;
    }

    public void setEquipType(type equipType) {
        this.equipType = equipType;
    }
    public ArrayList<String> getAvailiableMusInsDates() {
        return availiableMusInsDates;
    }

    public void setAvailiableMusInsDates(ArrayList<String> availiableMusInsDates) {
        this.availiableMusInsDates = availiableMusInsDates;
    }

    public boolean setAvaliableDate(String str) {
        for(String s : this.availiableMusInsDates) {
            if(s.equals(str)) {
                return false;
            }
        }
        return this.availiableMusInsDates.add(str);
    }

    public boolean checkMusInsAvailiability(String checkDate){
        for(String date:this.getAvailiableMusInsDates()){
            if(date.equals(checkDate))return true;
        }
        return false;
    }

    public static Equipment makeNewEquipment() {
        Scanner keyboard = new Scanner(System.in);

        String tempIDstr;
        int equipentID;
        String equipmentName;
        String equipTypeStr;
        Equipment.type equipType;
        String avalDate;
        char opt;


        System.out.print("Equipment ID: ");
        tempIDstr = keyboard.nextLine();
        equipentID = Integer.parseInt(tempIDstr);
        System.out.print("Equipment name: ");
        equipmentName = keyboard.nextLine();
        System.out.print("Equipment type [violi/klarino/kithara/baglamas/drums/fysarmonika]: ");
        equipTypeStr = keyboard.next();
        if(equipTypeStr.equals("violi"))
            equipType = type.violi;
        else if(equipTypeStr.equals("klarino"))
            equipType = type.klarino;
        else if(equipTypeStr.equals("kithara"))
            equipType = type.kithara;
        else if(equipTypeStr.equals("baglamas"))
            equipType = type.baglamas;
        else if(equipTypeStr.equals("drums"))
            equipType = type.drums;
        else
            equipType = type.fysarmonika;

        Equipment e = new Equipment(equipentID,equipmentName,equipType);

        while(true) {
            System.out.print("Add avaliable date? [y/n]: ");
            opt = keyboard.next().charAt(0);

            if(opt == 'y') {
                System.out.print("Avaliable date: ");
                avalDate = keyboard.next();
                e.setAvaliableDate(avalDate);
            }
            else if(opt == 'n') {
                break;
            }
            else {
                System.out.println("No such option.");
            }
        }

        return e;
    }

    @Override
    public String toString() {
        String str = "";

        str += "Equipment ID: " + this.getMusInsId() + "\n";
        str += "Equipment name: " + this.name + "\n";
        str += "Equipment type: ";
        switch(this.equipType) {
            case violi:
                str += "violi";
                break;
            case klarino:
                str += "klarino";
                break;
            case kithara:
                str += "kithara";
                break;
            case baglamas:
                str += "baglamas";
                break;
            case drums:
                str += "drums";
                break;
            case fysarmonika:
                str += "fysarmonika";
                break;
        }
        str += "\n";

        return str;
    }

    //public static ArrayList<type> getTypeList() {


    //    return list;
    //}

}
