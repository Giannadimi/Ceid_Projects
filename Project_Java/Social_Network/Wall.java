import java.util.Scanner; 
import java.io.*; 
import java.util.ArrayList;
import java.util.*; 

public class Wall {
    private    ArrayList<Wall_Messages> Messages;
    private    String username;

    public Wall(String username,ArrayList<Wall_Messages> Messages){

        this.username=username;
        this.Messages=Messages;
    }//Wall constructor end

    public void setUsername(String username)
    {
        this.username=username;
    }

    public void setMessages( ArrayList<Wall_Messages> Messages)
    {
        this.Messages=Messages;
    }
    //get username
    public String getUsername(){
        return username;
    }

    //get message_creator
    public ArrayList<Wall_Messages> getMessages(){
        return Messages;
    }

    public String toString() {
        return       "\t\t~Welcome to your wall "+username+ "~\n" +"\n "
        +  this.Messages    + "\n";
    }

}//Wall class end