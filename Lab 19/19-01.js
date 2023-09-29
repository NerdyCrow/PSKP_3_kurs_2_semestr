const { PrismaClient } = require("@prisma/client");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const client = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
const models = {
  faculties: client.FACULTY,
  pulpits: client.PULPIT,
  subjects: client.SUBJECT,
  teachers: client.TEACHER,
  auditoriums: client.AUDITORIUM,
  auditoriumstypes: client.AUDITORIUM_TYPE,
};
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.use("/api", router);

const getMiddleware = async (req, res, next) => {
  const table = models[`${req.url.split("/")[1]}`];
  const data = await table.findMany();

  if (!data) {
    return res.status(404).json({
      error: `${table.name} not found`,
    });
  }

  res.json(data);
};

router.get(
  [
    "/faculties",
    "/pulpits",
    "/teachers",
    "/subjects",
    "/auditoriumstypes",
    "/auditoriums",
  ],
  getMiddleware
);

router.get("/faculties/:xyz/subjects", async (req, res) => {
  const data = await models.faculties.findMany({
    where: {
      FACULTY: decodeURIComponent(req.params.xyz),
    },
    select: {
      FACULTY: true,
      PULPIT_PULPIT_FACULTYToFACULTY: {
        select: {
          PULPIT: true,
          SUBJECT_SUBJECT_PULPITToPULPIT: {
            select: {
              SUBJECT_NAME: true,
            },
          },
        },
      },
    },
  });

  if (!data) {
    return res.status(404).json({
      error: "Data not found",
    });
  }

  res.send(data);
});

router.get("/auditoriumtypes/:xyz/auditoriums", async (req, res) => {
  const data = await models.auditoriumstypes.findFirst({
    where: { AUDITORIUM_TYPE: decodeURIComponent(req.params.xyz) },
    select: {
      AUDITORIUM_TYPE: true,
      AUDITORIUM_AUDITORIUM_AUDITORIUM_TYPEToAUDITORIUM_TYPE: {
        select: {
          AUDITORIUM: true,
        },
      },
      AUDITORIUM_TYPE: true,
    },
  });

  if (!data) {
    return res.status(404).json({
      message: "Data not found",
    });
  }

  res.send(data);
});

router.get("/auditoriumsWithComp1", async (req, res) => {
  const data = await models.auditoriums.findMany({
    where: {
      AUDITORIUM_TYPE: "ЛБ-К",
      AUDITORIUM: {
        contains: "-1",
      },
    },
  });

  if (!data) {
    return res.status(404).json({
      message: "Data not found",
    });
  }

  res.send(data);
});

router.get("/puplitsWithoutteachers", async (req, res) => {
  const data = await models.pulpits.findMany({
    where: {
      TEACHER_TEACHER_PULPITToPULPIT: {
        none: {},
      },
    },
  });

  if (!data) {
    return res.status(404).json({
      message: "Data not found",
    });
  }

  res.send(data);
});

router.get("/pulpitsWithVladimir", async (req, res) => {
  const data = await models.pulpits.findMany({
    where: {
      TEACHER_TEACHER_PULPITToPULPIT: {
        some: {
          TEACHER_NAME: {
            contains: "Владимир ",
          },
        },
      },
    },
  });

  if (!data) {
    return res.status(404).json({
      message: "Data not found",
    });
  }

  res.send(data);
});

router.get("/auditoriumsSameCount", async (req, res) => {
  const data = await models.auditoriums.groupBy({
    by: ["AUDITORIUM_TYPE", "AUDITORIUM_CAPACITY"],
    _count: {
      _all: true,
    },
  });

  if (!data) {
    return res.status(404).json({
      message: "Data not found",
    });
  }

  res.send(data);
});

router.get("/pagination/:num", async (req, res) => {
  const data = await models.pulpits.findMany({
    skip: (req.params.num - 1) * 10,
    take: 10,
    include: {
      _count: {
        select: {
          TEACHER_TEACHER_PULPITToPULPIT: true,
        },
      },
    },
  });

  if (!data) {
    return res.status(404).json({
      message: "Data not found",
    });
  }

  res.send(data);
});

router.get("/fluentapi", async (req, res) => {
  const data = await models.faculties
    .findUnique({
      where: {
        FACULTY: "ИДиП",
      },
    })
    .PULPIT_PULPIT_FACULTYToFACULTY();

  if (!data) {
    return res.status(404).json({
      message: "Data not found",
    });
  }

  res.send(data);
});

router.get("/transaction", async (req, res) => {
  try {
    await client.$transaction(async (tran) => {
      await tran.AUDITORIUM.updateMany({
        where: {},
        data: {
          AUDITORIUM_CAPACITY: {
            increment: 100,
          },
        },
      });

      console.log(await tran.AUDITORIUM.findMany())
     
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Timeout expired'));
        }, 10000)}); 


      });
    }

  catch (error) {

      models.auditoriums.findMany().then(result => { res.status(200).json(result) })
      console.log(error);
    }

  });

const postMiddleware = async (req, res, next) => {
  const table = models[`${req.url.split("/")[1]}`];

  if (
    await table.findFirst({
      where: {
        [table.name]: req.body[`${table.name}`],
      },
    })
  ) {
    return res
      .status(400)
      .json({ error: "Object with this primary key already exists" });
  }

  table
    .create({
      data: req.body,
    })
    .then((createdEntity) => {
      res.status(201).json({ createdEntity });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: "Reference to non-existent foreign key" });
    });
};

router.post(
  ["/teachers", "/subjects", "/auditoriumstypes", "/auditoriums"],
  postMiddleware
);

router.post("/faculties", async (req, res) => {
  const table = models.faculties;

  if (
    await table.findFirst({
      where: {
        FACULTY: req.body.FACULTY,
      },
    })
  ) {
    return res
      .status(400)
      .json({ error: "Object with this primary key already exists" });
  }

  table
    .create({
      data: {
        FACULTY: req.body.FACULTY,
        FACULTY_NAME: req.body.FACULTY_NAME,
        PULPIT_PULPIT_FACULTYToFACULTY: {
          create: req.body.Pulpits
        },
      },
    })

    .then((createdEntity) => {
      res.status(201).json({ createdEntity });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error:
          "Reference to non-existent foreign key or reference to already exists key",
      });
    });
});

router.post("/pulpits", async (req, res) => {
  const table = models.pulpits;

  if (
    await table.findFirst({
      where: {
        PULPIT: req.body.PULPIT,
      },
    })
  ) {
    return res
      .status(400)
      .json({ error: "Object with this primary key already exists" });
  }

  table
    .create({
      data: {
        PULPIT: req.body.PULPIT,
        PULPIT_NAME: req.body.PULPIT_NAME,
        FACULTY_PULPIT_FACULTYToFACULTY: {
          connectOrCreate: {
            where: {
              FACULTY: req.body.FACULTY,
            },
            create: {
              FACULTY: req.body.FACULTY,
              FACULTY_NAME: req.body.FACULTY_NAME,
            },
          },
        },
      },
    })
    .then((createdEntity) => {
      res.status(201).json({ createdEntity });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: "Reference to non-existent foreign key" });
    });
});

const putMiddleware = async (req, res, next) => {
  const table = models[`${req.url.split("/")[1]}`];

  if (
    !(await table.findFirst({
      where: {
        [table.name]: req.body[`${table.name}`],
      },
    }))
  ) {
    return res
      .status(400)
      .json({ error: "Object with this primary key doesn't exist" });
  }

  table
    .update({
      where: {
        [table.name]: req.body[`${table.name}`],
      },
      data: req.body,
    })
    .then((updatedEntity) => {
      res.status(200).json(updatedEntity);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: "Reference to non-existent foreign key" });
    });
};

router.put(
  [
    "/faculties",
    "/pulpits",
    "/teachers",
    "/subjects",
    "/auditoriumstypes",
    "/auditoriums",
  ],
  putMiddleware
);

const deleteMiddleware = async (req, res, next) => {
  const table = models[`${req.url.split("/")[1]}`];
  const primaryKey = decodeURIComponent(req.params.xyz);

  if (
    !(await table.findFirst({
      where: {
        [table.name]: primaryKey,
      },
    }))
  ) {
    return res
      .status(404)
      .json({ error: "Object with this primary key doesn't exist" });
  }

  table
    .delete({
      where: {
        [table.name]: primaryKey,
      },
    })
    .then((deletedEntity) => {
      res.status(200).json(deletedEntity);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: "There are foreign key to other tables" });
    });
};

router.delete(
  [
    "/faculties/:xyz",
    "/pulpits/:xyz",
    "/teachers/:xyz",
    "/subjects/:xyz",
    "/auditoriumstypes/:xyz",
    "/auditoriums/:xyz",
  ],
  deleteMiddleware
);
