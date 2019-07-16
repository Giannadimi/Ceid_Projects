import java.util.Scanner; 
import java.io.*; 
import java.util.ArrayList;
import java.util.*;

public class Friends

{
    private String person1;
    private String person2;
    static ArrayList<Friends> Friendslist = new ArrayList<>();
    //  static ArrayList<String> commonfriends = new ArrayList<>();
    public Friends(String person1, String person2) 
    {
        this.person1 = person1;
        this.person2 = person2;

    }

    public String getPerson1()
    { 
        return person1;
    }

    public void setPerson(String person1)
    {
        this.person1 = person1;
    }

    public String getPerson2()
    { 
        return person2;
    }

    public void setPerson2(String person2)
    { 
        this.person2 = person2;
    }

    public String toString() {
        return "person1:" +  this.person1       + "\n"
        + "person2:" +  this.person2 + "\n" ;
    }
}