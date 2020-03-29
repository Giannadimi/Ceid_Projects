package webproject.dao;

import webproject.model.Login;
import webproject.model.User;

public interface UserDao {
  int register(User user);
  User validateUser(Login login);
}