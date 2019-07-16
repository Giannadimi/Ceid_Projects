import java.util.Scanner; 
import java.io.*; 
import java.util.ArrayList;
import java.util.*;
public class Request{

    private String pers1;
    private String pers2;
    static ArrayList<Request> Request= new ArrayList<>();

    public Request(String pers1, String pers2) 
    {
        this.pers1 = pers1;
        this.pers2 = pers2;

    }

    public String getPers1()
    { 
        return pers1;
    }

    public void setPers1(String pers1)
    {
        this.pers1 = pers1;
    }

    public String getPers2()
    { 
        return pers2;
    }

    public void setPers2(String pers2)
    { 
        this.pers2 = pers2;
    }

    public String toString() {
        return "pers1:" +  this.pers1       + "\n"
        + "pers2:" +  this.pers2 + "\n" ;
    }
}