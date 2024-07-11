const usersServices = require("../../services/usersServices");

const pageSize = 5;

module.exports = {
  list: async (req, res) => {
    const users = await usersServices.getAllUsers();

    res.json({
      meta: {
        status: 200,
        url: req.originalUrl,
      },
      //data:{ users, count: users.length}
      data: {
        users: users.map((user) => ({
          id: user.id,
          name: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          detailUrl: `/api/user/${user.id}`,
        })),
      },
    });
  },

  detail: async (req, res) => {
    const user = await usersServices.getUser(req.params.id);

    res.json({
      meta: {
        status: 200,
        url: "/api/user/:id",
      },

      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        birthday: user.birthday,
        phone: user.phone,
        rol: user.role,
        avatar: user.avatar,
        adress: user.adress,
      },
    });
  },
};
