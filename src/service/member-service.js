import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import {
  createMemberValidation,
  getMemberValidation,
} from "../validation/member-validation.js";
import { ResponseError } from "../error/response-error.js";

const create = async (request) => {
  const member = validate(createMemberValidation, request);

  return prismaClient.member.create({
    data: {
      name: member.name,
      quota: member.quota,
    },
    select: {
      id: true,
      name: true,
      quota: true,
    },
  });
};

const get = async (memberId) => {
  const reqVal = validate(getMemberValidation, { memberId: Number(memberId) });

  const member = await prismaClient.member.findUnique({
    where: { id: reqVal.memberId },
    select: { id: true, name: true, quota: true },
  });

  if (!member) {
    throw new ResponseError(
      404,
      "Member tidak ditemukan",
      "ZYD-ERR-404-MEMBER"
    );
  }

  return member;
};

export default { create, get };
