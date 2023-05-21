import { UserService } from "../src/repository/index.js";
import { describe } from "mocha";
import chai from "chai";
import { faker } from "@faker-js/faker";

const expect = chai.expect;

describe("Testing CRUD for User Service", () => {

  let testUser

  it("It must return all users", async () => {
    const result = await UserService.getAll();
    expect(result).to.be.an("array");
  });

  it("It must create a new user", async () => {
    testUser = await UserService.create({
      name: faker.name.fullName(),
      email: faker.internet.email(),
      strategy: "local",
      password: "secret",
    });

    expect(testUser).to.have.property("_id");
  });

  it("It must return one user by _id", async () => {
    const result = await UserService.getAll();
    const firstUser = result[0];
    const id = firstUser._id;
    const user = await UserService.getOne({ _id: id });
    expect(user._id).to.be.deep.equal(id);
  });

  it("It should update testUser's name", async () => {
    const id = testUser._id;
    await UserService.update(id, {
      name: "Jorge",
    });
    testUser = await UserService.getOne({ _id: id });
    expect(testUser.name).to.be.deep.equal("Jorge");
  });

  it('It must get user created above and delete it', async () => { 
   
    await UserService.delete(testUser._id)

    const testUser_deleted = await UserService.getOne({_id: testUser._id})
    expect(testUser_deleted).to.be.equal(null)
})

});
