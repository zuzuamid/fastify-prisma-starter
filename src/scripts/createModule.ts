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
    [`${moduleBase}.routes.ts`]: `import express from "express";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import { ${capName}Controllers } from "./${moduleBase}.controller";

const router = express.Router();

router.post("/", auth(UserRole.ADMIN), ${capName}Controllers.create${capName});
router.get("/", auth(UserRole.ADMIN, UserRole.CUSTOMER), ${capName}Controllers.getAll${capName});
router.get("/:id", auth(UserRole.ADMIN, UserRole.CUSTOMER), ${capName}Controllers.get${capName}ById);
router.put("/:id", auth(UserRole.ADMIN), ${capName}Controllers.update${capName});
router.delete("/:id", auth(UserRole.ADMIN), ${capName}Controllers.delete${capName});

export const ${capName}Routes = router;
`,

    // 🚩 Controller file
    [`${moduleBase}.controller.ts`]: `import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ${capName}Services } from "./${moduleBase}.service";

const create${capName} = catchAsync(async (req, res) => {
  const result = await ${capName}Services.create${capName}(req.body);
  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: "${capName} created successfully!",
    data: result,
  });
});

const getAll${capName} = catchAsync(async (req, res) => {
  const result = await ${capName}Services.getAll${capName}();
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "All ${capName}s retrieved successfully!",
    data: result,
  });
});

const get${capName}ById = catchAsync(async (req, res) => {
  const result = await ${capName}Services.get${capName}ById(req.params.id);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "${capName} retrieved successfully!",
    data: result,
  });
});

const update${capName} = catchAsync(async (req, res) => {
  const result = await ${capName}Services.update${capName}(req.params.id, req.body);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "${capName} updated successfully!",
    data: result,
  });
});

const delete${capName} = catchAsync(async (req, res) => {
  const result = await ${capName}Services.delete${capName}(req.params.id);
  sendResponse(res, {
    status: httpStatus.OK,
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
    [`${moduleBase}.service.ts`]: `import { PrismaClient } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";

const prisma = new PrismaClient();

const create${capName} = async (payload: any) => {
  return await prisma.${moduleBase}.create({ data: payload });
};

const getAll${capName} = async () => {
  return await prisma.${moduleBase}.findMany({
    orderBy: { createdAt: "desc" },
  });
};

const get${capName}ById = async (id: string) => {
  const result = await prisma.${moduleBase}.findUnique({ where: { id } });
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, "${capName} not found");
  return result;
};

const update${capName} = async (id: string, payload: any) => {
  const result = await prisma.${moduleBase}.update({
    where: { id },
    data: payload,
  });
  return result;
};

const delete${capName} = async (id: string) => {
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
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
`,

    // 🚩 Validation
    [`${moduleBase}.validation.ts`]: `import { z } from "zod";

export const ${moduleBase}Validation = {
  create: z.object({
    name: z.string().min(1, "Name is required"),
  }),
  update: z.object({
    name: z.string().optional(),
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

// Improvement commit 36

// Improvement commit 123

// Improvement commit 157
