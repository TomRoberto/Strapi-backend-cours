"use strict";

/**
 * offer controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::offer.offer", ({ strapi }) => ({
  async deleteAll(ctx) {
    try {
      //   console.log(ctx.state.user);
      const userId = ctx.state.user.id;
      const user = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        userId,
        { populate: ["offers"] }
      );
      //   console.log(user);
      for (let i = 0; i < user.offers.length; i++) {
        // console.log(user.offers[i]);
        const offer = user.offers[i];
        await strapi.entityService.delete("api::offer.offer", offer.id);
      }
      return { message: "All offers deleted" };
    } catch (error) {
      ctx.response.status = 500;
      return { message: error.message };
    }
  },
  // async create(ctx) {
  //   try {
  //     // console.log(ctx.state.user);
  //     const requesterId = ctx.state.user.id;
  //     // console.log(typeof ctx.request.body.data);
  //     const parsedBody = JSON.parse(ctx.request.body.data);
  //     console.log(parsedBody);
  //     const ownerId = parsedBody.owner;
  //     if (requesterId !== ownerId) {
  //       ctx.response.status = 403;
  //       return { message: "You must be the offer's owner" };
  //     } else {
  //       const { data, meta } = await super.create(ctx);
  //       return { data, meta };
  //     }
  //     // return "Hello";
  //   } catch (error) {
  //     ctx.response.status = 500;
  //     return { message: error.message };
  //   }
  // },
}));
