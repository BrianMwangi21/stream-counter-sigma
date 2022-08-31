const Stream = require("../model/stream");

const getUserStream = async (username) => {
  let res = await Stream.findOne({ where: { username: username } })
    .then((user_stream) => {
      if (user_stream == null) {
        return null;
      }
      return JSON.stringify(user_stream);
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
  return res;
};

const createUserStream = async (username) => {
  const stream = {
    username: username,
    streams: 1,
  };
  let res = await Stream.create(stream)
    .then((user_stream) => {
      return JSON.stringify(user_stream);;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
  return res;
};

const updateUserStream = async (id, username, streams) => {
  let res = await Stream.findByPk(id)
    .then(async(user_stream) => {
      if (user_stream == null) {
        return null;
      }
      let update_res = await user_stream
        .update({ username: username, streams: streams })
        .then((updated_user_stream) => {
          return JSON.stringify(updated_user_stream);;
        })
        .catch((err) => {
          console.log(err);
          return null;
        });
      return update_res;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
  return res;
};

const checkUserStream = async (req, res) => {
  if (!req.body.username) {
    return res
      .status(400)
      .json({ data: { status: 1, message: "Username is required", data: {} } });
  }

  const username = req.body.username;
  let get_res = await getUserStream(username);

  if (get_res == null) {
    let create_res = await createUserStream(username);

    if (create_res == null) {
      return res.status(424).json({
        data: {
          status: 1,
          message: "User stream failed to create",
          data: {},
        },
      });
    }
    return res.status(201).json({
      data: {
        status: 0,
        message: "User stream created successfully",
        data: JSON.parse(create_res),
      },
    });
  } else {
    let { id, username, streams } = JSON.parse(get_res);

    if (streams < 3) {
      let update_res = await updateUserStream(id, username, streams + 1);

      if (update_res == null) {
        return res.status(424).json({
          data: {
            status: 1,
            message: "User stream failed to update",
            data: {},
          },
        });
      }
      return res.status(201).json({
        data: {
          status: 0,
          message: "User stream updated successfully",
          data: JSON.parse(update_res),
        },
      });
    } else {
      return res.status(400).json({
        data: {
          status: 1,
          message: "User cannot have more than 3 video streams",
          data: JSON.parse(get_res),
        },
      });
    }
  }
};

const getAllUserStreams = async (req, res) => {
  const streams = await Stream.findAndCountAll();
  res.status(200).json({
    data: {
      status: 0,
      message: "All User Streams fetched successfully",
      data: {
        content: streams.rows,
        count: streams.count,
      },
    },
  });
};

module.exports = {
  checkUserStream,
  getAllUserStreams,
};
