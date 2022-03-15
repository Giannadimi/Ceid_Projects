public class User {
    // Variables
    private String name;
    private String lastName;
    private String phone;
    private String email;
    private String password;

    // Constructors
    public User(String name, String lastName, String phone, String email, String password) {
        this.name = name;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }

    // Seters - Getters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void printUserInfo() { System.out.println(this.toString()); }

    @Override
    public String toString() {
        String str = "";
        str += "User Name: " + this.name + "\n";
        str += "User Last name: " + this.lastName + "\n";
        str += "User Phone: " + this.phone + "\n";
        str += "User Email: " + this.email + "\n";
        str += "User Password: " + this.password + "\n";

        return str;
    }

}
