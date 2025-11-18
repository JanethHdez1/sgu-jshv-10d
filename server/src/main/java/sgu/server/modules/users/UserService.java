package sgu.server.modules.users;


import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    private List<User> users = new ArrayList<>();
    private int currentId = 1;

    public List<User> getAll() {
        return users;
    }

    public User getById(int id) {
        return users.stream().filter(u -> u.getId() == id).findFirst().orElse(null);
    }

    public User create(User user) {
        user.setId(currentId++);
        users.add(user);
        return user;
    }

    public User update(User user) {
        User u = getById(user.getId());
        if (u != null) {
            u.setName(user.getName());
            u.setEmail(user.getEmail());
            u.setPhone(user.getPhone());
        }
        return u;
    }

    public void delete(int id) {
        users.removeIf(u -> u.getId() == id);
    }
}
