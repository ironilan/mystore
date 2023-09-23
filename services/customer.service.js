const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize')

class CustomerService {

  constructor(){
  }
  async create(data) {

    const newCustomer = await models.Customer.create(data,{
      include: ['user']
    });
    return newCustomer;
  }

  async find() {

    const rta = await models.Customer.findAll({
      include: ['user']
    });
    return rta;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if(!customer)
    {
      throw boom.notFound('customer not found');
    }
    return customer;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const customer = await models.Customer.findByPk(id);
    await customer.destroy();
    return { rta: true };
  }

}

module.exports = CustomerService;
