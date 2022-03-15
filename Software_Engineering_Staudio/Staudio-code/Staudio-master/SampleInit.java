import java.util.ArrayList;

public class SampleInit {
    private static ArrayList<Producer> prodList =new ArrayList<>();
    private static ArrayList<Client> clientList =new ArrayList<>();
    private static ArrayList<Owner> ownerList =new ArrayList<>();
    private static ArrayList<Studio> studioList =new ArrayList<>();
    private static ArrayList<Reservation> reservationList =new ArrayList<>();

    public static ArrayList<Offer> getOfferList() {
        return offerList;
    }

    public static void setOfferList(ArrayList<Offer> offerList) {
        SampleInit.offerList = offerList;
    }

    private static ArrayList<Offer> offerList = new ArrayList<>();

    public static void setProdList(ArrayList<Producer> prodList) {
        SampleInit.prodList = prodList;
    }

    public SampleInit() {
        //producers initialization
        Producer producer1 = new Producer("Kirk", "Gian", "6981097028", "email@gmail.com", "otithelw", 16, true, 3);
        prodList.add(producer1);
        Producer producer2 = new Producer("Vasilis", "Terlegkas", "6981097028", "email@gmail.com", "otithelw", 17, true, 4);
        prodList.add(producer2);

        //owners initialization
        Owner owner1 = new Owner("Nikos", "Korompos", "6981787878", "korompos@gmail.com", "kalantas", 20);
        ownerList.add(owner1);
        Owner owner2 = new Owner("Kwstas", "Kavourdirhs", "2310474829", "kavourdirhs@hotmail.gr", "kavourdirhs", 4019);
        ownerList.add(owner2);
        Owner owner3 = new Owner("Giorgos", "Georgiou", "2310474829", "kavourdirhs@hotmail.gr", "kavourdirhs", 40);
        ownerList.add(owner3);

        //client initialization
        Client client1 = new Client("Maria", "Pentagiotisa", "2102904738", "maria5i@gmail.com", "5i", 100);
        clientList.add(client1);
        Client client2 = new Client("Ihsous", "Xristos", "2107777777", "jesuschrist@hotmail.com", "isousnika", 777);
        clientList.add(client2);
        Client client3 = new Client("Pasxalis", "Terzis", "2102102102", "dethymamaitoemail@hotmail.com", "terzitragoyda", 778);
        clientList.add(client3);
        Client client4 = new Client("Snoop", "Dog", "2102102102", "smokeweveryday@hotmail.com", "snoop", 778);
        clientList.add(client3);

        //studios initialization
        Studio studio1 = new Studio("Shame Story", 1, "kapouedw", "2222222222", 3.2, 3.3, 5);
        studioList.add(studio1);
        Studio studio2 = new Studio("American Canary ", 2, "parapera", "2222222222", 3.4, 3.7, 4);
        studioList.add(studio2);
        Studio studio3 = new Studio("Wudsound ", 3, "nea smurnnis 23", "2111111424", 3.4, 3.7, 5);
        studioList.add(studio3);



        Room room1 = new Room(1, Room.type.highend, Room.size.large, 4, 15);
        room1.setAvaliableRoomDate("1-6-19 17:00:00");
        room1.setAvaliableRoomDate("1-6-19 18:00:00");
        room1.setAvaliableRoomDate("1-6-19 19:00:00");
        room1.setAvaliableRoomDate("2-6-19 17:00:00");
        room1.setAvaliableRoomDate("2-6-19 18:00:00");
        room1.setAvaliableRoomDate("2-6-19 19:00:00");
        Room room2 = new Room(2, Room.type.highend, Room.size.large, 4, 12);
        room2.setAvaliableRoomDate("3-6-19 17:00:00");
        room2.setAvaliableRoomDate("4-6-19 18:00:00");
        room2.setAvaliableRoomDate("5-6-19 19:00:00");
        room2.setAvaliableRoomDate("6-6-19 17:00:00");
        room2.setAvaliableRoomDate("7-6-19 18:00:00");
        room2.setAvaliableRoomDate("8-6-19 19:00:00");
        Room room3 = new Room(3, Room.type.rehearsal, Room.size.small, 5, 14);
        room3.setAvaliableRoomDate("1-6-19 17:00:00");
        room3.setAvaliableRoomDate("2-6-19 18:00:00");
        room3.setAvaliableRoomDate("3-6-19 19:00:00");
        room3.setAvaliableRoomDate("4-6-19 17:00:00");
        room3.setAvaliableRoomDate("5-6-19 18:00:00");
        room3.setAvaliableRoomDate("6-6-19 19:00:00");
        Room room4 = new Room(4, Room.type.rehearsal, Room.size.medium, 2, 20);
        room4.setAvaliableRoomDate("7-6-19 17:00:00");
        room4.setAvaliableRoomDate("8-6-19 18:00:00");
        room4.setAvaliableRoomDate("9-6-19 19:00:00");
        room4.setAvaliableRoomDate("11-6-19 17:00:00");
        room4.setAvaliableRoomDate("12-6-19 18:00:00");
        room4.setAvaliableRoomDate("13-6-19 19:00:00");
        studio1.setRoom(room1);
        studio1.setRoom(room2);
        studio1.setRoom(room3);
        studio1.setRoom(room4);

        Room room5 = new Room(5, Room.type.rehearsal, Room.size.small, 2, 50);
        room5.setAvaliableRoomDate("1-6-19 17:00:00");
        room5.setAvaliableRoomDate("1-6-19 18:00:00");
        room5.setAvaliableRoomDate("1-6-19 19:00:00");
        room5.setAvaliableRoomDate("2-6-19 17:00:00");
        room5.setAvaliableRoomDate("2-6-19 18:00:00");
        room5.setAvaliableRoomDate("2-6-19 19:00:00");
        Room room6 = new Room(6, Room.type.highend, Room.size.large, 4, 300);
        room6.setAvaliableRoomDate("1-6-19 17:00:00");
        room6.setAvaliableRoomDate("2-6-19 18:00:00");
        room6.setAvaliableRoomDate("3-6-19 19:00:00");
        room6.setAvaliableRoomDate("4-6-19 17:00:00");
        room6.setAvaliableRoomDate("5-6-19 18:00:00");
        room6.setAvaliableRoomDate("6-6-19 19:00:00");
        Room room7 = new Room(7, Room.type.highend, Room.size.medium, 3, 5000);
        room7.setAvaliableRoomDate("2-6-19 17:00:00");
        room7.setAvaliableRoomDate("3-6-19 18:00:00");
        room7.setAvaliableRoomDate("4-6-19 19:00:00");
        room7.setAvaliableRoomDate("5-6-19 17:00:00");
        room7.setAvaliableRoomDate("6-6-19 18:00:00");
        room7.setAvaliableRoomDate("7-6-19 19:00:00");
        Room room8 = new Room(8, Room.type.rehearsal, Room.size.medium, 1, 12);
        room8.setAvaliableRoomDate("2-6-19 17:00:00");
        room8.setAvaliableRoomDate("3-6-19 18:00:00");
        room8.setAvaliableRoomDate("4-6-19 19:00:00");
        room8.setAvaliableRoomDate("5-6-19 17:00:00");
        room8.setAvaliableRoomDate("6-6-19 18:00:00");
        room8.setAvaliableRoomDate("7-6-19 19:00:00");
        studio2.setRoom(room5);
        studio2.setRoom(room6);
        studio2.setRoom(room7);
        studio2.setRoom(room8);

        studio1.setAvaliableDate("2-5-29 19:00:00");
        studio1.setAvaliableDate("2-5-19 18:00:00");
        Equipment guitar1 =new Equipment(1,"Fender",Equipment.type.kithara);
        Equipment guitar2 =new Equipment(2,"Yamaha",Equipment.type.kithara);
        Equipment klarino1=new Equipment(3,"HandMade",Equipment.type.klarino);
        Equipment drums1=new Equipment(4,"Yamaha",Equipment.type.drums);
        studio1.setEquip(guitar1);
        studio1.setEquip(guitar2);
        studio1.setEquip(klarino1);
        studio1.setEquip(drums1);

        client1.getHistory().add(new Reservation(10000, client1, studio1, room1, "01-01-2019", false, new ArrayList<Equipment>()));

        //reservations initialization
        Reservation reserv1 = new Reservation(001, client1, studio1, room1, "10-10-2019", false, new ArrayList<Equipment>());
        reservationList.add(reserv1);
        Reservation reserv2 = new Reservation(002, client3, studio1, room5, "20-05-2019", true , new ArrayList<Equipment>());
        reservationList.add(reserv2);

        Production prod1 = new Production(003, client1, studio2, false, Production.type.fullAlbum,  "29-05-2019", producer1, 10, false);
        Production prod2 = new Production(004, client1, studio2, true, Production.type.miniAlbum, "29-01-2019",  producer1, 10, false);
        producer1.setProduction(prod1);
        producer1.setProduction(prod2);

//        Room room9 = new Room(9, Room.type.highend, Room.size.small, 1, 2);
//        Room room10 = new Room(10, Room.type.highend, Room.size.large, 1, 200);
//        Room room11 = new Room(11, Room.type.highend, Room.size.medium, 1, 0);
//        Room room12 = new Room(12, Room.type.highend, Room.size.medium, 1, 1);
//        studio3.setRoom(room9);
//        studio3.setRoom(room10);
//        studio3.setRoom(room11);
//        studio3.setRoom(room12);
        Offer offer1 = new Offer(1,studio1,5, 2, Offer.type.rehearsal, false);
        offerList.add(offer1);
        studio1.setOffer(offer1);
        //reserv1.setOffer(offer1);
        Offer offer2 = new Offer(2,studio1,10, 4, Offer.type.rehearsal, false);
        offerList.add(offer2);
        studio1.setOffer(offer2);
        //reserv2.setOffer(offer2);
        Offer offer3 = new Offer(3,studio1,5, 2, Offer.type.recording, false);
        offerList.add(offer3);
        studio1.setOffer(offer3);
        Offer offer4 = new Offer(4,studio3,5, 2, Offer.type.rehearsal, false);
        offerList.add(offer4);
        studio3.setOffer(offer4);
        Offer offer5 = new Offer(5,studio3,10, 4, Offer.type.rehearsal, false);
        offerList.add(offer5);
        studio3.setOffer(offer5);
        Offer offer6 = new Offer(6,studio3,5, 2, Offer.type.recording, false);
        offerList.add(offer6);
        studio3.setOffer(offer6);
        Offer offer7 = new Offer(7,studio2,5, 2, Offer.type.rehearsal, false);
        offerList.add(offer7);
        studio2.setOffer(offer7);
        Offer offer8 = new Offer(8,studio2,10, 4, Offer.type.rehearsal, false);
        offerList.add(offer8);
        studio2.setOffer(offer8);
        Offer offer9 = new Offer(9,studio2,5, 2, Offer.type.recording, false);
        offerList.add(offer9);
        studio2.setOffer(offer9);

        producer1.setPartnerStudio(studio1);
        producer2.setPartnerStudio(studio1);
        System.out.println(studio1.getPartnerProducers().size());

        owner1.setPartnerStudio(studio1);
        owner2.setPartnerStudio(studio1);
    }

    public static ArrayList<Studio> getStudioList() {
        return SampleInit.studioList;
    }

    public static ArrayList<Producer> getProdList() {
        return prodList;
    }

    public static ArrayList<Client> getClientList() { return clientList; }

    public static ArrayList<Reservation> getReservationList() { return reservationList; }

    public static ArrayList<Owner> getOwnerList() {
        return ownerList;
    }

}
