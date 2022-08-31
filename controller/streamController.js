const Stream = require("../model/stream");

const getUserStream = async (username) => {
  await Stream.findOne({ where: { username, username } })
    .then((user_stream) => {
      if (user_stream == null) {
        return null;
      }
      return user_stream;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

const createUserStream = async (username) => {
  const stream = {
    username: username,
    streams: 1,
  };
  await Stream.create(stream)
    .then((user_stream) => {
      return user_stream;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

const updateUserStream = async (id, username, streams) => {
  await Stream.findByPk(id)
    .then((user_stream) => {
      if (user_stream == null) {
        return null;
      }
      user_stream
        .update({ username: username, streams: streams })
        .then((updated_user_stream) => {
          return updated_user_stream;
        })
        .catch((err) => {
          console.log(err);
          return null;
        });
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

const checkUserStream = async (req, res) => {
  // This function will :
  // 1. Validate the request
  // 2. Check if user exists
  // 3. If they dont, add them to the database and set stream count to 1
  // 4. If they do, check the number of streams. If less than 3, increment by 1. If 3, limit addition

  if (!req.body.username) {
    res
      .status(400)
      .json({ data: { status: 1, message: "Username is required" } });
  }

  const username = req.body.username;
  let user_stream_check = await getUserStream(username);

  if (user_stream_check == null) {
    let create_user_stream_res = createUserStream(username);

    if (create_user_stream_res == null) {
      res.status(424).json({
        data: {
          status: 1,
          message: "User stream failed to create",
          data: create_user_stream_res,
        },
      });
    }
    res.status(201).json({
      data: {
        status: 0,
        message: "User stream created successfully",
        data: create_user_stream_res,
      },
    });
  } else {
    let { id, username, streams } = user_stream_check;

    if (streams < 3) {
      let update_user_stream_res = await updateUserStream(
        id,
        username,
        streams + 1
      );

      if (update_user_stream_res == null) {
        res.status(424).json({
          data: {
            status: 1,
            message: "User stream failed to update",
            data: update_user_stream_res,
          },
        });
      }
      res.status(204).json({
        data: {
          status: 0,
          message: "User stream updated successfully",
          data: update_user_stream_res,
        },
      });
    }else {
      res.status(400).json({
        data: {
          status: 0,
          message: "User cannot have more than 3 video streams",
          data: user_stream_check,
        },
      });
    }
  }
};

module.exports = checkUserStream;
