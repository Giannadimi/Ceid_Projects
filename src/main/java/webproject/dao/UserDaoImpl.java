package webproject.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import webproject.model.Login;
import webproject.model.User;

public class UserDaoImpl implements UserDao {
	@Autowired
	DataSource datasource;
	@Autowired
	JdbcTemplate jdbcTemplate;
	private Login login;

	public int register(User user) {
		String sql = "insert into user values(?,?,?,?,?)";
		return jdbcTemplate.update(sql, new Object[]{user.getUsername(), user.getPassword(), user.getFirstname(),
				user.getLastname(), user.getEmail()});
	}

	public User validateUser(Login login) {
		this.login = login;
		String sql = "select * from user where username='" + login.getUsername() + "' and password='" + login.getPassword()
				+ "'";
		List<User> user = jdbcTemplate.query(sql, new UserMapper());
		return user.size() > 0 ? user.get(0) : null;
	}
}

class UserMapper implements RowMapper<User> {
	public User mapRow(ResultSet rs, int arg1) throws SQLException {
		User user = new User();
		user.setUsername(rs.getString("username"));
		user.setPassword(rs.getString("password"));
		user.setFirstname(rs.getString("firstname"));
		user.setLastname(rs.getString("lastname"));
		user.setEmail(rs.getString("email"));
		return user;
	}
}