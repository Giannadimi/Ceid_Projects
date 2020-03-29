package webproject.dao;

import webproject.model.Login;
import webproject.model.User;

public interface UserDao {
  void register(User user);
  User validateUser(Login login);
}