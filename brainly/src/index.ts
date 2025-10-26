import express, { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { z } from "zod";
import bcrypt from "bcrypt";
import { ContentModel, LinkModel, UserModel } from "./db";
import { random } from "./utils";
import cors from "cors";
import * as dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "NAVYA THE GREAT";
try {
  async function connectDB() {
    const mongoUrl =
      process.env.MONGO_URL || "mongodb://localhost:27017/brainly";
    await mongoose.connect(mongoUrl);
    console.log("mongo connected");
  }

  connectDB();
} catch (err) {
  console.log("not  able to  connect to db");
}
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://brain.navyasinha.xyz"],
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ensure uploads dir exists
const UPLOAD_DIR = path.join(process.cwd(), "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// multer storage
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const name = `${Date.now()}-${file.originalname.split(".")[0]}`;
    return {
      folder: "brainly_uploads", // works fine now
      resource_type: "raw", // allows PDFs
      allowed_formats: ["pdf"], // restricts to PDF
      public_id: name, // custom name
    };
  },
});

const upload = multer({ storage });

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.token;
    if (!token) {
      res.status(401).json({
        message: "Token not provided!",
      });
      return;
    }

    const verifiedtoken = jwt.verify(token as string, JWT_SECRET) as {
      id: string;
    };

    if (verifiedtoken) {
      req.userId = verifiedtoken.id;
      next();
    } else {
      res.status(401).json({
        message: "Invalid token!",
      });
      return;
    }
  } catch (e) {
    res.status(401).json({
      message: "Token verification failed!",
    });
    return;
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

app.post("/content", auth, async (req: AuthenticatedRequest, res) => {
  const link = req.body.link;
  const type = req.body.type;
  const title = req.body.title;
  try {
    await ContentModel.create({
      link: link,
      type: type,
      title: title,
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

app.get("/content", auth, async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;

  const content = await ContentModel.find({
    userId: userId,
  }).populate("userId", "name");

  res.json({
    content: content,
  });
});

app.delete(
  "/api/v1/content/:id",
  auth,
  async (req: AuthenticatedRequest, res) => {
    const contentId = req.params.id;
    const userId = req.userId;

    const existing = await ContentModel.findOne({ _id: contentId, userId });
    if (!existing) {
      res.status(404).json({ message: "Content not found or not authorized" });

      return;
    }

    await ContentModel.deleteOne({ _id: contentId, userId });
    res.json({ message: "Content deleted successfully" });
  }
);

app.post(
  "/api/v1/brain/share",
  auth,
  async (req: AuthenticatedRequest, res) => {
    const share = req.body.share;
    if (share) {
      const hash = random(10);
      const linkexists = await LinkModel.findOne({
        userId: req.userId,
      });
      if (linkexists) {
        res.json({
          message: "/share" + linkexists.hash,
        });
        return;
      }

      await LinkModel.create({
        userId: req.userId,
        hash,
      });

      res.json({
        message: "/share" + hash,
      });
    } else {
      await LinkModel.deleteOne({
        userId: req.userId,
      });

      res.json({
        message: "deleted link ",
      });
    }
  }
);

app.get(
  "/api/v1/brain/:sharelink",
  auth,
  async (req: AuthenticatedRequest, res) => {
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
  }
);

app.post(
  "/upload-pdf",
  auth,
  upload.single("file"),
  async (req: AuthenticatedRequest, res) => {
    try {
      const f = req.file as Express.Multer.File;
      if (!f) {
        res.status(400).json({ message: "No file uploaded" });
        return;
      }

      const title = req.body.title || "Untitled";
      const type = req.body.type || "PDF";
      const userId = req.userId;

      // Cloudinary gives a secure URL
      const fileUrl = (f as any).path;

      await ContentModel.create({
        title,
        type,
        link: fileUrl,
        userId,
        tags: [],
      });

      res.json({ message: "PDF uploaded", url: fileUrl });
    } catch (err) {
      console.error("upload-pdf error:", err);
      res.status(500).json({ message: "Upload failed", error: err });
    }
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("the server is listening on port" + PORT);
});
