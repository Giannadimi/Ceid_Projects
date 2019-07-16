import java.util.Scanner; 
import java.io.*; 
import java.util.ArrayList;
import java.util.*; 
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Wall_Messages {

    private Timestamp timestamp = new Timestamp(System.currentTimeMillis());
    private String message_text;
    private String message_creator;
    private ArrayList<ReplyMessage> Replies = new ArrayList<ReplyMessage>();  
    int likes;//counter for that

    public Wall_Messages(String message_text, String message_creator, ArrayList<ReplyMessage> Replies, int likes) 
    {

        this.message_creator = message_creator;
        this.likes=likes;
        this.Replies=Replies;

    }

    public void setReplies(ArrayList<ReplyMessage> Replies)
    {
        this.Replies=Replies;
    }

    public void setMessage_text(String  message_text)
    {
        this.message_text = message_text;
    }

    public void setLikes(int likes)
    {
        this.likes=likes;
    }
    //get timestamp
    public Timestamp getTimestamp(){
        return timestamp;
    }

    //get likes
    public int getLikes(){
        return likes;
    }

    //get message_text
    public String getMessage_text(){
        return message_text;
    }

    //get message_creator
    public String getMessage_creator(){
        return message_creator;
    }

    //get message_creator
    public ArrayList<ReplyMessage> getReplyMessage(){
        return Replies;
    }

    public String toString() {
        String output = String.format("%1$s : %2$s| Likes: %3$s | [%4$s]",  this.message_creator, this.message_text,this.likes,timestamp); 

        return      output   +"\n" 
        +  this.Replies    + "\n";
    }

}//Wall_Messages class end