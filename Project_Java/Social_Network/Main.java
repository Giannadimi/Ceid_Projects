import java.util.Scanner; 
import java.io.*; 
import java.util.ArrayList;
import java.util.*; 

public class Main {

    public static void main (String[] args) {
        ArrayList <Users> Userslist;
        ArrayList <Wall> Wall;
        ArrayList <Wall_Messages> Messages;
        ArrayList <Friends> Friendslist;
        ArrayList <Wall_Messages> Wall_Messages;
        ArrayList <ReplyMessage>  ReplyMessage;
        ArrayList <Request> Request;

        // Users LoggedInUser = new Users(String firstname,String lastname,String password,String e_mail,int id);
        Friendslist=FriendsInitialazation();
        //Wall=Wall_MessagesInitialazation();

        System.out.println("\n\t\t~Welcome to our Social Network~\n"); 
        Scanner myObj = new Scanner(System.in);  // Create a Scanner object for ints
        Scanner myObj1 = new Scanner(System.in);  // Create a Scanner object for strings
        System.out.println("Please choose one of the following options\n1.Log in \n2.Sing up");

        int choice=myObj.nextInt();

        if(choice<1 | choice >2)
        {
            System.out.println("Wrong choice\nPlease choose an option between 1-\n1.Log in\n");
            choice=myObj.nextInt();

        }
        while(choice<1 | choice >2)
        {

            System.out.println("Wrong choice\nPlease choose an option between 1-\n1.Log in\n");
            choice=myObj.nextInt();

        }

        System.out.println("Enter Username :");
        String username = myObj1.nextLine();  // Read username

        System.out.println("Enter Password :");
        String password = myObj1.nextLine();  // Read user password

        //Call the Login method to check if the user gave the right name and password 
        String login_username=Login(username,password,UsersInitialazation());		

        while(login_username=="NULL")
        {
            System.out.println("Wrong passwod or username.\nPlease try again");
            System.out.println("Enter Username :");
            username = myObj1.nextLine();  // Read username

            System.out.println("Enter Password :");
            password = myObj1.nextLine();  // Read user password

            //flag=Login(username,password, UsersInitialazation());

        }

        System.out.println("Login Successful!\n");
        UserMenu login=new UserMenu();		
        //Login_User_Menu login=new Login_User_Menu();	
        login.UserMenu(login_username);

    }//MENU end

    public static ArrayList<Users> UsersInitialazation() {
        //User array initialazation
        ArrayList<Users> Userslist = new ArrayList<Users>();
        Userslist.add(new Users("Gianna","Dimitrouka","gianna1","giannaastakos@gmail.com",1));
        Userslist.add(new Users("Manos","Manou","gianna2345","Manosmanou@gmail.com",2));
        Userslist.add(new Users("Anna","Algeri","12345","Annaalgeri@gmail.com",3));
        Userslist.add(new Users("Alexis","Kouggelis","12346","Alexiskouggelis@gmail.com",4));
        Userslist.add(new Users("Alexandra","Kouveli","12346","AlexandraKouveli@gmail.com",5));
        Userslist.add(new Users("Alexia","Siahou","12346","AlexiaSiahou@gmail.com",6));
        return(Userslist);
    }//UsersInitialazation end

    public static ArrayList<Friends> FriendsInitialazation(){

        ArrayList<Friends> Friendslist = new ArrayList<Friends>();
        Friendslist.add(new Friends("Gianna", "Manos"));
        Friendslist.add(new Friends("Gianna", "Anna"));
        Friendslist.add(new Friends("Anna", "Manos"));
        Friendslist.add(new Friends("Alexis", "Manos"));
        Friendslist.add(new Friends("Alexis", "Anna"));
        Friendslist.add(new Friends("Alexia", "Alexandra"));
        return(Friendslist);
    }//FriendsInitialazation

    public static ArrayList<Wall> Wall_MessagesInitialazation(){
        //  Wall_Messages(String message_text, String message_creator, ArrayList<ReplyMessage> Replies, int likes)      
        ArrayList<Wall_Messages> Wall_Messages1 = new ArrayList<Wall_Messages>();
        ArrayList<Wall_Messages> Wall_Messages2 = new ArrayList<Wall_Messages>();
        ArrayList<Wall_Messages> Wall_Messages3 = new ArrayList<Wall_Messages>();
        ArrayList<Wall_Messages> Wall_Messages4 = new ArrayList<Wall_Messages>();
        ArrayList<Wall_Messages> Wall_Messages5 = new ArrayList<Wall_Messages>();
        ArrayList<Wall_Messages> Wall_Messages6 = new ArrayList<Wall_Messages>();
        ArrayList <ReplyMessage>  ReplyMessage1= new ArrayList <ReplyMessage>();
        ArrayList <ReplyMessage>  ReplyMessage2= new ArrayList <ReplyMessage>();
        ArrayList <ReplyMessage>  ReplyMessage3= new ArrayList <ReplyMessage>();
        ArrayList <ReplyMessage>  ReplyMessage4= new ArrayList <ReplyMessage>();
        ArrayList <ReplyMessage>  ReplyMessage5= new ArrayList <ReplyMessage>();
        ArrayList <ReplyMessage>  ReplyMessage6= new ArrayList <ReplyMessage>();
        ArrayList <ReplyMessage>  ReplyMessage7= new ArrayList <ReplyMessage>();
        ArrayList <Wall>  Wall=new ArrayList<Wall>();

        //Anna
        ReplyMessage1.add(new ReplyMessage("Hi Anna","Gianna",2));
        ReplyMessage1.add(new ReplyMessage("How are you Gianna?","Anna",2));
        ReplyMessage1.add(new ReplyMessage("Everything alright what about you?","Gianna",2));
        ReplyMessage1.add(new ReplyMessage("Working all day.I have to go..See you soon!!Bye","Anna",2));
        ReplyMessage1.add(new ReplyMessage("Bye!!","Gianna",2));
        Wall_Messages1.add(new Wall_Messages("Hey Gianna", "Gianna",ReplyMessage1,3));
        Wall.add(new Wall("Anna",Wall_Messages1));

        //Gianna
        ReplyMessage2.add(new ReplyMessage("Hi Anna","Gianna",2));
        ReplyMessage2.add(new ReplyMessage("How are you Gianna?","Anna",2));
        ReplyMessage2.add(new ReplyMessage("Everything alright what about you?","Gianna",2));
        ReplyMessage2.add(new ReplyMessage("Working all day.I have to go..See you soon!!Bye","Anna",2));
        ReplyMessage2.add(new ReplyMessage("Bye!!","Gianna",2));
        Wall_Messages2.add(new Wall_Messages("Hey Gianna", "Anna",ReplyMessage1,3));
        ReplyMessage3.add(new ReplyMessage("Nice quote Anna keep going","Gianna",2));	
        Wall_Messages2.add(new Wall_Messages("Don't Stop Until You are proud!", "Anna",ReplyMessage3,3));
        Wall.add(new Wall("Gianna",Wall_Messages2));

        //Alexis
        ReplyMessage4.add(new ReplyMessage("It's a great opportunity for you!Good job dude.","Anna",2));
        ReplyMessage4.add(new ReplyMessage("Thanks a lot Anna.","Alexis",2));		
        Wall_Messages3.add(new Wall_Messages("Can't wait for Google Summer School", "Alexis",ReplyMessage4,3));
        Wall.add(new Wall("Alexis",Wall_Messages3));

        //Manos 
        ReplyMessage5.add(new ReplyMessage("Don't be late.i will waiting for you.Bye!","Anna",2));
        ReplyMessage5.add(new ReplyMessage("I am glad to seeing you too Anna.Can't wait","Manos",2));		
        Wall_Messages4.add(new Wall_Messages("Can't wait to see you at the party Mano", "Anna",ReplyMessage4,3));
        Wall.add(new Wall("Manos",Wall_Messages4));

        //Alexia
        ReplyMessage6.add(new ReplyMessage("One of my favourite souls too","Alexia",2));
        ReplyMessage6.add(new ReplyMessage("I am in love with Marilyn great she has a great soul","Alexandra",2));		
        Wall_Messages5.add(new Wall_Messages("I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.Marilyn Monroe ", "Alexia",ReplyMessage4,3));
        Wall.add(new Wall("Alexia",Wall_Messages5));

        //Alexandra
        ReplyMessage7.add(new ReplyMessage("He was unbelievable such a beautiful mind","Alexandra",2));
        ReplyMessage7.add(new ReplyMessage("Great mind:) we own him a lot","Alexia",2));		
        Wall_Messages6.add(new Wall_Messages("“Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.-Albert Einstein", "Alexandra",ReplyMessage4,3));
        Wall.add(new Wall("Alexandra",Wall_Messages6));
        return(Wall);
    }//Wall initialazation

    //Method to search if a member with this name and this password exists
    public static String Login(String username,String password, ArrayList<Users> Userslist)
    {
        String login_username="NULL";

        for(Users i : Userslist){
            if((i.getFirstname().equals(username)) && (i.getPassword().equals(password)))
            {
                login_username=i.getFirstname();
            }
        }//for end
        return login_username;
    }//Login function end

}