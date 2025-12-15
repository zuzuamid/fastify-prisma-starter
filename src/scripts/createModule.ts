import fs from "fs";
import path from "path";

const createModule = (moduleName: string): void => {
  const baseDir = path.join(__dirname, "../", "app", "modules", moduleName);
  const moduleBase = path.basename(moduleName);

  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
    console.log(`📁 Directory created: ${baseDir}`);
  } else {
    console.log(`⚠️ Directory already exists: ${baseDir}`);
  }

  const capName = capitalize(moduleBase);

  const files: Record<string, string> = {
    // 🚩 Routes file
    [`${moduleBase}.routes.ts`]: `import { UserRole } from "@prisma/client";
import { FastifyInstance } from "fastify";

import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { ${capName}Controllers } from "./${moduleBase}.controller";
import { ${moduleBase}Validation } from "./${moduleBase}.validation";

const ${capName}Routes = async (fastify: FastifyInstance) => {
  fastify.post(
    "/",
    {
      preHandler: [
        auth(UserRole.ADMIN),
        validateRequest(${moduleBase}Validation.create),
      ],
    },
    ${capName}Controllers.create${capName}
  );

  fastify.get(
    "/",
    {
      preHandler: auth(UserRole.ADMIN, UserRole.USER),
    },
    ${capName}Controllers.getAll${capName}
  );

  fastify.get(
    "/:id",
    {
      preHandler: auth(UserRole.ADMIN, UserRole.USER),
    },
    ${capName}Controllers.get${capName}ById
  );

  fastify.put(
    "/:id",
    {
      preHandler: [
        auth(UserRole.ADMIN),
        validateRequest(${moduleBase}Validation.update),
      ],
    },
    ${capName}Controllers.update${capName}
  );

  fastify.delete(
    "/:id",
    {
      preHandler: auth(UserRole.ADMIN),
    },
    ${capName}Controllers.delete${capName}
  );
};

export { ${capName}Routes };
`,

    // 🚩 Controller file
    [`${moduleBase}.controller.ts`]: `import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ${capName}Services } from "./${moduleBase}.service";

const create${capName} = catchAsync(async (request: FastifyRequest, reply: FastifyReply) => {
  const result = await ${capName}Services.create${capName}(request.body as any);
  sendResponse(reply, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "${capName} created successfully!",
    data: result,
  });
});

const getAll${capName} = catchAsync(async (_request: FastifyRequest, reply: FastifyReply) => {
  const result = await ${capName}Services.getAll${capName}();
  sendResponse(reply, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All ${capName}s retrieved successfully!",
    data: result,
  });
});

const get${capName}ById = catchAsync(async (request: FastifyRequest, reply: FastifyReply) => {
  const id = Number((request.params as any).id);
  const result = await ${capName}Services.get${capName}ById(id);
  sendResponse(reply, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "${capName} retrieved successfully!",
    data: result,
  });
});

const update${capName} = catchAsync(async (request: FastifyRequest, reply: FastifyReply) => {
  const id = Number((request.params as any).id);
  const result = await ${capName}Services.update${capName}(id, request.body as any);
  sendResponse(reply, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "${capName} updated successfully!",
    data: result,
  });
});

const delete${capName} = catchAsync(async (request: FastifyRequest, reply: FastifyReply) => {
  const id = Number((request.params as any).id);
  const result = await ${capName}Services.delete${capName}(id);
  sendResponse(reply, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "${capName} deleted successfully!",
    data: result,
  });
});

export const ${capName}Controllers = {
  create${capName},
  getAll${capName},
  get${capName}ById,
  update${capName},
  delete${capName},
};
`,

    // 🚩 Service file
    [`${moduleBase}.service.ts`]: `import httpStatus from "http-status";

import ApiError from "../../errors/ApiError";
import prisma from "../../utils/prisma";
import { I${capName} } from "./${moduleBase}.interface";

const create${capName} = async (payload: I${capName}) => {
  return await prisma.${moduleBase}.create({ data: payload });
};

const getAll${capName} = async () => {
  return await prisma.${moduleBase}.findMany({
    orderBy: { createdAt: "desc" },
  });
};

const get${capName}ById = async (id: number) => {
  const result = await prisma.${moduleBase}.findUnique({ where: { id } });
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, "${capName} not found");
  return result;
};

const update${capName} = async (id: number, payload: Partial<I${capName}>) => {
  const result = await prisma.${moduleBase}.update({
    where: { id },
    data: payload,
  });
  return result;
};

const delete${capName} = async (id: number) => {
  await prisma.${moduleBase}.delete({ where: { id } });
  return { message: "${capName} deleted successfully" };
};

export const ${capName}Services = {
  create${capName},
  getAll${capName},
  get${capName}ById,
  update${capName},
  delete${capName},
};
`,

    // 🚩 Interface
    [`${moduleBase}.interface.ts`]: `export interface I${capName} {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
`,

    // 🚩 Validation
    [`${moduleBase}.validation.ts`]: `import { z } from "zod";

export const ${moduleBase}Validation = {
  create: z.object({
    body: z.object({
      name: z.string().min(1, "Name is required"),
    }),
  }),
  update: z.object({
    body: z.object({
      name: z.string().min(1, "Name is required").optional(),
    }),
  }),
};
`,

    // 🚩 Constant
    [`${moduleBase}.constant.ts`]: `export const ${capName}Constants = {
  DEFAULT_LIMIT: 10,
  DEFAULT_SORT: "desc",
};
`,
  };

  Object.entries(files).forEach(([fileName, content]) => {
    const filePath = path.join(baseDir, fileName);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content, "utf-8");
      console.log(`✅ File created: ${filePath}`);
    } else {
      console.log(`⚠️ File already exists: ${filePath}`);
    }
  });
};

const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

const moduleName = process.argv[2];
if (!moduleName) {
  console.error("❌ Please provide a module name.");
  process.exit(1);
}

createModule(moduleName);
