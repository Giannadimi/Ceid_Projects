import java.util.Scanner; 
import java.io.*; 
import java.util.ArrayList;
import java.util.*;

//We make the assumption that all users are unique
//propably we can generalize that later

class UserMenu 
{

    static Main first_menu=new Main();//Create a new instance of menu in order to have access to the initial values of Users ArrayList
    static ArrayList<Users> UsersList=first_menu.UsersInitialazation(); //we load the initial array that we initial create in Menu class 
    static ArrayList<Friends> FriendsList=first_menu.FriendsInitialazation();
    static ArrayList<Wall> Wall=first_menu.Wall_MessagesInitialazation();
    static ArrayList<Request> Request;
    public void UserMenu(String login_username){
        System.out.print("Hello "+login_username+"!\n");
        int menu_choice;
        Scanner input = new Scanner(System.in);

        do
        {
            System.out.println("\n1. Add a Friend");
            System.out.println("2. Remove a Friend");
            System.out.println("3. Display all Friends");
            System.out.println("4. Friends?");
            System.out.println("5. See your wall");
            System.out.println("6. See your friends wall");
            System.out.println("7. Send friend request");
            System.out.println("8. Accept/Reject friend request");
            System.out.println("9. Exit\n");

            //Just for testing if the arraylist passes right to the wall class(Checked!!)			
            //Wall_Test.Wall(login_username);//activate the wall of the user based on the username

            System.out.print("\nSelect one option: ");
            menu_choice = input.nextInt();

            switch (menu_choice)
            {
                case 1:

                UsersList= AddFriend(UsersList); //add a user and update the list back
                break;

                case 2:
                UsersList= DeleteFriend(UsersList); //delete a user and update the list back
                break;

                case 3:
                UsersDisplay(UsersList); //display all current users from the list
                FriendsDisplay(FriendsList); //display all current users from the list
                break;

                case 4: boolean friendship=CheckFriend(FriendsList); 
                break;

                case 5: DisplayWall(Wall,login_username);
                break;

                case 6: See_friends_wall(FriendsList,Wall,login_username);
                break;

                case 7: Send_Friend_Request(FriendsList,Request,login_username);
                break;

                case 8:AcceptOrReject(Request, FriendsList);
                break;

                case 9: //exit

                System.exit(0);

            }//end switch        

        } while (menu_choice != 9);

    }//constructor end

    //See friends wall
    public void See_friends_wall(ArrayList<Friends> Friends, ArrayList<Wall> Wall, String login_username)
    {
        ArrayList<Friends> My_friends = new ArrayList<Friends>();
        Scanner input = new Scanner(System.in);

        //Create a list only with your friends  
        for (Friends f : Friends) {
            if ( (f.getPerson1().equals(login_username)) ) 	
            {
                My_friends.add(new Friends(login_username,f.getPerson2()));
            }else if( f.getPerson2().equals(login_username))
            {
                My_friends.add(new Friends(login_username,f.getPerson2()));
            }//if end
        }//for end

        int i=1;
        //Display the list of your friends
        for (Friends f : My_friends) {
            System.out.print(i+". "+f.getPerson2()+"\n");
            i++;	

        }

        int friend_choice;

        do{
            System.out.print("Please choose whose friend wall you want to see :\n");
            friend_choice = input.nextInt(); 
            if(friend_choice<1 || friend_choice>My_friends.size())
            {
                System.out.print("WARNING:That user does not contained in the list.Please try again!\n");
            }
        }while(friend_choice<1 || friend_choice>My_friends.size());

        int j=1;
        String friend="NULL";
        for (Friends f : My_friends) {
            if(j==friend_choice)	
            {
                friend=f.getPerson2();

            }//if end
            j++;
        }

        //Calling Display Wall based on the friend that login user choose
        DisplayWall(Wall, friend);

        int menu_choice;
        //Now ask for the user to choose on of the following choices Post a message
        do{
            System.out.println("\n1.Post a message");
            System.out.println("2. Reply to a message");
            System.out.println("3. Like a Post or a Message");
            System.out.println("4. Back\n");	
            System.out.print("\nSelect one option: ");
            menu_choice = input.nextInt();
        }while(menu_choice<1 || menu_choice>4 );

        switch (menu_choice)
        {
            case 1:
            Wall=Post_Message(Wall,friend,login_username);
            break;

            case 2:
            System.out.println("Reply a message");
            break;

            case 3:
            System.out.println("Like a Post or a Message");
            break;

            case 4: 
            break;		
        }//end switch
    }

    //Post a message method
    public static ArrayList<Wall>  Post_Message(ArrayList<Wall> Wall,String friend_name,String login_username){
        ArrayList <Wall_Messages> Wall_Messages=new ArrayList<Wall_Messages>();
        ArrayList <ReplyMessage>  ReplyMessage=new ArrayList <ReplyMessage>();

        Scanner input = new Scanner(System.in);
        System.out.println("Please enter the text that you want to post :\n");
        String message_text = input.nextLine(); 
        Wall_Messages.add(new Wall_Messages(message_text,login_username,ReplyMessage,0));
        Wall.add(new Wall(friend_name,Wall_Messages));
        return Wall;

    }

    //Friendship test
    public static boolean CheckFriend(ArrayList<Friends> Friendslist)
    {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter the 1st User:");
        String person1 = input.next();

        System.out.print("Enter the 2st User:");
        String person2 = input.next();

        boolean flag=false;
        Iterator<Friends> it =Friendslist.iterator();
        while (it.hasNext()) {
            if (((it.next().getPerson1().equals(person1)) && it.next().getPerson2().equals(person2)) | ((it.next().getPerson1().equals(person2)) && it.next().getPerson2().equals(person1)))
            {
                flag=true;
            }

        }//end while
        if(flag == true) 
        {
            System.out.print("Are friends!\n");	
        } 
        else 
        {
            System.out.print("They're not friends!\n");
        }	
        return flag;
    }//Friendship check end

    //Display your wall
    public void DisplayWall(ArrayList<Wall> Wall,String username)
    {

        for (Wall f : Wall) {
            if (f.getUsername().equals(username)) {
                System.out.print(f.toString());	

            }
        }

    }//end Display end

    //method that used to pass arraylist through classes
    public static  ArrayList<Users> ArrayList_return()
    {
        return UsersList;

    }//end ArrayList_return

    public static void UsersDisplay(ArrayList<Users> UsersList)
    {
        System.out.println("~Users List~\n");
        for (int i = 0; i < UsersList.size(); i++) {
            System.out.println(UsersList.get(i));
        }

    }// end UsersDisplay

    public static void FriendsDisplay(ArrayList<Friends> FriendsList)
    {

        System.out.println("~Friends List~\n");
        for (int i = 0; i < FriendsList.size(); i++) {
            System.out.println(FriendsList.get(i));
        }

    }// end UsersDisplay

    public static ArrayList<Users> DeleteFriend(ArrayList<Users> UsersList)
    {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter Friend's name to remove: \n");
        String username = input.next();

        Iterator<Users> it = UsersList.iterator();
        while (it.hasNext()) {
            if (it.next().getFirstname().equals(username)) {
                it.remove();
                System.out.print("User :" + username + "Deleted Successfully!\n");	
                // If you know it's unique, you could break; here

            }
        }		
        return UsersList;
    }//DeleteFriend end

    public static ArrayList<Users> AddFriend(ArrayList<Users> UsersList)
    {

        Scanner input = new Scanner(System.in);
        System.out.print("Enter your firstname: ");
        String firstname = input.next();

        System.out.print("Enter your Lastname: ");
        String lastname = input.next();

        System.out.print("Enter your e-mail: ");
        String e_mail = input.next();

        System.out.print("Enter your password ");
        String password = input.next();

        System.out.print("Enter an id ");
        int id = input.nextInt();

        UsersList.add(new Users(firstname,lastname,e_mail,password,id));
        System.out.print("New user added successfully!");

        return UsersList;
    } 

    public void Send_Friend_Request(ArrayList<Friends> Friends, ArrayList<Request> Request,String login_username)
    {
        ArrayList<Request> My_Requests = new ArrayList<Request>();
        Scanner input = new Scanner(System.in);

        //Create a list only with friends requests
        for (Friends i : Friends) {
            if ( (!i.getPerson1().equals(login_username)) | (i.getPerson2().equals(login_username) )) 	
            {
                My_Requests.add(new Request(login_username,i.getPerson2()));
                /* }else if(i.getPerson2().equals(login_username))
                {
                My_Requests.add(new Request(login_username,i.getPerson2 ()));
                }//if end*/
            }
        }//for end

        int k=1;
        //Display the list of Requests
        for (Request i : My_Requests) {

            System.out.print(k+". "+i.getPers2()+"\n");
            k++;	
        }

        int friend_request;

        do{
            System.out.print("Please choose a friend that you want to Accept Or Reject :\n");
            friend_request = input.nextInt(); 
            if(friend_request<1 || friend_request>My_Requests.size())
            {
                System.out.print("WARNING:That user does not contained in the list.Please try again!\n");
            }
        }while(friend_request<1 || friend_request>My_Requests.size());

        int j=1;
        String request="NULL";
        for (Request f : My_Requests) {
            if(j==friend_request)	
            {
                request=f.getPers2();

            }//if end
            j++;
        }

    }

    //Method to accept or reject a friend request
    public static ArrayList<Request> AcceptOrReject(ArrayList<Request> Request, ArrayList<Friends> Friends){  //reject
        Scanner input = new Scanner(System.in);
        System.out.print("Enter the Friend that you want to Reject: \n");
        String username = input.next();

        Iterator<Request> it = Request.iterator();
        while (it.hasNext()) {
            if (it.next().getPers1().equals(username)) {
                it.remove();
                System.out.print("User :" + username + "Rejected Successfully!\n");	
                // If you know it's unique, you could break; here

            }

        }
        return Request;
    }
}