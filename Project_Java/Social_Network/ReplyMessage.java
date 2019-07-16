import java.util.Scanner; 
import java.io.*; 
import java.util.ArrayList;
import java.util.*; 
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
public class ReplyMessage {

    private Timestamp timestamp = new Timestamp(System.currentTimeMillis());
    private String message_text;
    private String message_creator;
    private int likes;

    public ReplyMessage(String message_text, String message_creator,int likes)
    {
        this.message_text = message_text;
        this.message_creator = message_creator;
        this.likes=likes;
    }//void constructor

    //get message_text
    public String getMessage_text(){
        return message_text;
    }

    //get message_creator
    public String getMessage_creator(){
        return message_creator;
    }

    //get timestamp
    public Timestamp getTimestamp(){
        return timestamp;
    }

    //get likes
    public int getLikes(){
        return likes;
    }

    public String toString() {
        String output = String.format("%1$s : %2$s | Likes:%3$s | [%4$s]",  this.message_creator, this.message_text,this.likes,timestamp); 
        return  "\t"+output + "\n";  

    }
}//Reply_Message class end