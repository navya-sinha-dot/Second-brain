import express, { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { z } from "zod";
import bcrypt from "bcrypt";
import { ContentModel, LinkModel, UserModel } from "./db";
import { random } from "./utils";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "NAVYA THE GREAT";

async function connectDB() {
  const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/brainly";
  await mongoose.connect(mongoUrl);
  console.log("mongo connected");
}

connectDB();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173","https://brain.navyasinha.xyz"]
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
  })
);

// CORS is already handled by the main CORS middleware above

app.use(express.json());


const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.token;
    const verifiedtoken = jwt.verify(token as string, JWT_SECRET);

    if (verifiedtoken) {
      //@ts-ignore
      req.userId = verifiedtoken.id;
      next();
    }
  } catch (e) {
    res.json({
      message: "token not provided!",
    });
  }
};

app.post("/api/v1/signup", async (req, res) => {
  const requiredbody = z.object({
    name: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(5).max(30),
  });

  const Parseddata = requiredbody.safeParse(req.body);

  if (!Parseddata.success) {
    res.json({
      message: "incorrect entries",
      error: Parseddata.error,
    });
    return;
  }

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const hashedpassword = await bcrypt.hash(password, 5);

    await UserModel.create({
      name: name,
      email: email,
      password: hashedpassword,
    });
  } catch (e) {
    res.json({
      message: "user already exists",
    });
    return;
  }
  res.json({
    message: "you are signed Up",
  });
});

app.post("/api/v1/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const founduser = await UserModel.findOne({
    email: email,
  });
  if (!founduser) {
    res.json({
      message: "incorrect credentials",
    });
  } else {
    const passwordmatched = await bcrypt.compare(password, founduser.password);

    if (founduser && passwordmatched) {
      const token = jwt.sign(
        {
          id: founduser._id,
        },
        JWT_SECRET
      );

      res.json({
        token,
      });
    } else {
      res.json({
        message: "incorrect password",
      });
    }
  }
});

app.post("/content", auth, async (req, res) => {
  const link = req.body.link;
  const type = req.body.type;
  const title = req.body.title;
  try {
    await ContentModel.create({
      link: link,
      type: type,
      title: title,
      //@ts-ignore
      userId: req.userId,
      tags: [],
    });
  } catch (e) {
    res.json({
      message: e,
    });
    return;
  }
  res.json({
    message: "content created!",
  });
});

app.get("/content", auth, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;

  const content = await ContentModel.find({
    userId: userId,
  }).populate("userId", "name");

  res.json({
    content: content,
  });
});

app.delete("/content", auth, async (req, res) => {
  const contentId = req.body.contentId;

  await ContentModel.deleteMany({
    contentId,
    userId: req.body.id,
  });
});

app.post("/api/v1/brain/share", auth, async (req, res) => {
  const share = req.body.share; // whether or not the person wants to enable or disable the link to share

  if (share) {
    const hash = random(10);
    const linkexists = await LinkModel.findOne({
      //@ts-ignore
      userId: req.userid,
    });
    if (linkexists) {
      res.json({
        message: "/share" + linkexists.hash,
      });
      return;
    }

    await LinkModel.create({
      //@ts-ignore
      userId: req.userid,
      hash,
    });

    res.json({
      message: "/share" + hash,
    });
  } else {
    await LinkModel.deleteOne({
      //@ts-ignore
      userId: req.userid,
    });

    res.json({
      message: "deleted link ",
    });
  }
});

app.get("/api/v1/brain/:sharelink", auth, async (req, res) => {
  const hash = req.params.sharelink;

  const link = await LinkModel.findOne({
    hash: hash,
  });

  if (!link) {
    res.json({
      message: "incorrect link",
    });
    return;
  }

  const content = await ContentModel.findOne({
    userId: link.userId,
  });

  const user = await UserModel.findOne({
    _id: link.userId,
  });

  res.json({
    username: user?.name,
    content: content,
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("the server is listening on port"+ PORT);
});
