import memberService from "../service/member-service.js";

const create = async (req, res, next) => {
  try {
    const result = await memberService.create(req.body);
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await memberService.get(req.params.memberId);
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

export default { create, get };
