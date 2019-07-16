public class Users 
{
    //private String username;
    private String firstname;
    private String lastname;
    private String password;
    private String email;
    private int userID;

    public Users(String firstname, String lastname, String password, String email, int id) 
    {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.userID = id; 
        this.password=password;
    }
    //get firstname
    public String getFirstname()
    { 
        return firstname;
    }
    //set firstname
    public void setFirstname(String firstname)
    {
        this.firstname = firstname;
    }
    //get lastname
    public String getLaststname()
    { 
        return lastname;
    }
    //set lastname
    public void setLaststname(String lastname)
    { 
        this.lastname = lastname;
    }
    //get email
    public String getEmail(){
        return email;
    }
    //set email
    public void setEmail(String email)
    {
        this.email = email;
    }
    //get password
    public String getPassword() {
        return this.password;
    }
    //set password
    public void setPassword(String password) {
        this.password = password;
    }
    //get userID
    public int getUserId() {
        return this.userID;
    }

    public String toString() {
        return "Name:" +  this.firstname       + "\n"
        + "Lastname:" +  this.lastname + "\n" 
        + "E-mail :"  +  this.email    + "\n"
        + "password :" + this.password   + "\n" 
        + "ID="      + this.userID     + "\n" ;
    }

}
