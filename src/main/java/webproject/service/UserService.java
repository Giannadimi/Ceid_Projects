package webproject.service;
import org.springframework.stereotype.Service;
import webproject.model.Login;
import webproject.model.User;

@Service
public interface UserService {

	int register(User user);

	User validateUser(Login login);
}