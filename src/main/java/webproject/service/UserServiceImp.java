package webproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import webproject.dao.UserDao;
import webproject.model.Login;
import webproject.model.User;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    public UserDao userDao;

    public int register(User user) {
        return userDao.register(user);
    }

    public User validateUser(Login login) {
        return userDao.validateUser(login);
    }

}