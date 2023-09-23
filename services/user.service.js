const boom = require('@hapi/boom');


//const getConnection = require('../libs/postgres');
//const pool = require('../libs/postgres.pool');

const { models } = require('../libs/sequelize')

class UserService {
  constructor() {
    //this.pool = pool;
    //this.pool.on('error', (err) => console.log(err)); //escuchamos si hay un error en la coneccion
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return data;
  }

  async find() {
    //este clien es para la coneccion, pero cada q haces un request haces una nueva coneccion por eso se usa el poll
    // const client = await getConnection();
    // const rta = await client.query('SELECT * FROM tasks');

    //const query = 'SELECT * FROM tasks';
    const rta = await models.User.findAll({
      include: ['customer']
    });
   // const rta = await this.pool.query(query);

    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(id, changes) {

    const user = await this.findOne(id);
    const rta = await user.update(changes);

    return rta;
  }

  async delete(id) {
    const user = await models.User.findByPk(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
