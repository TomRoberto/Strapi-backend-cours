module.exports = async (policyContext, config, { strapi }) => {
  //   console.log("je passe dans ma policy");
  //   console.log(policyContext.state.user);
  const requesterId = policyContext.state.user.id;
  //   console.log(requesterId);

  if (policyContext.request.params.id) {
    const offerId = policyContext.request.params.id;
    console.log(offerId);
    const offer = await strapi.entityService.findOne(
      "api::offer.offer",
      offerId,
      { populate: ["owner"] }
    );
    console.log(offer);
    if (requesterId === offer.owner.id) {
      return true;
    } else {
      return false;
    }
  } else {
    console.log(policyContext.request.body);
    const ownerId = JSON.parse(policyContext.request.body.data).owner;
    console.log(ownerId);
    if (requesterId !== ownerId) {
      return false;
    } else {
      return true;
    }
  }
};
