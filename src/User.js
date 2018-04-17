const MySqlDb = require('./mySqlDatabase');

const database = 'bamazon';


getRoleId = function (roleName) {
  //returns the role id from the name
  const db = new MySqlDb(database);

  const roleQuery = `
    select roleId
    from role
    where roleName = ?;
  `;

  const roleId = db.query(roleQuery, [roleName])
    .then((data) => {
      return data.rows[0].roleId;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  return roleId.then((data) => {
    db.close();
    return data;
  })

}

createUser = async function (username, password, roleName) {

  const roleId = await getRoleId(roleName);
  if (!roleId) {
    return null;
  }

  const createUserQuery = `
    insert user (username, userPassword, roleid)
    values (?, ?, ?);
  `;

  const db = new MySqlDb(database);
  let user = null;
  try {
    const newUser = await db.query(createUserQuery, [username, password, roleId]);
    user = {
      userId: newUser.rows.insertId,
      username,
      roleName
    };
  } catch (err) {
    switch (err.code) {
      case 'ER_DUP_ENTRY':
        console.log(`The username "${username}" already exists.`);
        break;

      default:
        console.log(err);
        break;
    }
  } finally {
    db.close();
  }

  return user;
}

getUser = async function ( username, password ){
  const db = new MySqlDb(database);
  const getUserQuery = `
    select u.userId
    , u.userName
    , case when ? = u.userPassword then 1 else 0 end as authenticated
    , r.roleName
    from user u
    inner join role r
      on r.roleId = u.roleId
    where u.userName = ?;
  `;

  let result = null;
  try {
    const queryResult = await db.query(getUserQuery, [password, username]);
    result = {
      userId: queryResult.rows[0].userId,
      userName: queryResult.rows[0].userName,
      authed: queryResult.rows[0].authed,
      roleName: queryResult.rows[0].roleName
    };
  } catch (error) {
    console.log(error);
  } finally {
    db.close();
  }

  return result;

}

module.exports = {
  getRoleId: getRoleId,
  createUser: createUser,
  getUer: getUser
}