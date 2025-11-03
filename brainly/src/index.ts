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
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

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
    origin: ["http://localhost:5173", "https://brain.navyasinha.xyz"],
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
    credentials: true,
  })
);

app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "brainly_uploads",
    resource_type: "raw",
    allowed_formats: ["pdf"],
    public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
  }),
});

const upload = multer({ storage });

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.token;
    if (!token) {
      res.status(401).json({ message: "Token not provided!" });
      return;
    }
    const verifiedtoken = jwt.verify(token as string, JWT_SECRET) as {
      id: string;
    };
    req.userId = verifiedtoken.id;
    next();
  } catch {
    res.status(401).json({ message: "Token verification failed!" });
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
    res.json({ message: "incorrect entries", error: Parseddata.error });
    return;
  }
  const { name, email, password } = req.body;
  try {
    const hashedpassword = await bcrypt.hash(password, 5);
    await UserModel.create({ name, email, password: hashedpassword });
    res.json({ message: "you are signed Up" });
  } catch {
    res.json({ message: "user already exists" });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { email, password } = req.body;
  const founduser = await UserModel.findOne({ email });
  if (!founduser) {
    res.json({ message: "incorrect credentials" });
    return;
  }
  const passwordmatched = await bcrypt.compare(password, founduser.password);
  if (passwordmatched) {
    const token = jwt.sign({ id: founduser._id }, JWT_SECRET);
    res.json({ token });
  } else {
    res.json({ message: "incorrect password" });
  }
});

app.post("/content", auth, async (req: AuthenticatedRequest, res) => {
  const { link, type, title } = req.body;
  await ContentModel.create({
    link,
    type,
    title,
    userId: req.userId,
    tags: [],
  });
  res.json({ message: "content created!" });
});

app.get("/content", auth, async (req: AuthenticatedRequest, res) => {
  const content = await ContentModel.find({ userId: req.userId }).populate(
    "userId",
    "name"
  );
  res.json({ content });
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
      const linkexists = await LinkModel.findOne({ userId: req.userId });
      if (linkexists) {
        res.json({ hash: linkexists.hash });
        return;
      }
      await LinkModel.create({ userId: req.userId, hash });
      res.json({ hash });
    } else {
      await LinkModel.deleteOne({ userId: req.userId });
      res.json({ message: "deleted link" });
    }
  }
);

app.get("/api/v1/brain/:sharelink", async (req, res) => {
  try {
    const hash = req.params.sharelink;
    const link = await LinkModel.findOne({ hash });

    if (!link) {
      res.json({ message: "incorrect link" });
      return;
    }

    const contents = await ContentModel.find({ userId: link.userId });
    const user = await UserModel.findOne({ _id: link.userId });

    // If no contents found
    if (!contents || contents.length === 0) {
      res.json({
        username: user?.name || "Unknown User",
        contents: [],
        message: "No content found for this user",
      });
      return;
    }

    res.json({
      username: user?.name || "Unknown User",
      contents: contents.map((c) => ({
        title: c.title,
        type: c.type,
        link: c.link,
        tags: c.tags,
      })),
    });
  } catch (err: any) {
    console.error("Error fetching shared brain:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post(
  "/api/v1/upload-pdf",
  auth,
  upload.single("file"),
  async (req: AuthenticatedRequest, res) => {
    try {
      const f = req.file as any;
      if (!f) {
        res.status(400).json({ message: "No file uploaded" });

        return;
      }

      const uploadResult = await cloudinary.uploader.upload(f.path, {
        resource_type: "raw",
        folder: "brainly_uploads",
        format: "pdf",
        public_id: `${Date.now()}-${f.originalname.split(".")[0]}`,
        flags: "attachment:false",
      });

      const fileUrl = uploadResult.secure_url;
      const title = req.body.title || f.originalname || "Untitled";
      const type = "PDF";
      const userId = req.userId;

      await ContentModel.create({
        title,
        type,
        link: fileUrl,
        userId,
        tags: [],
      });

      res.json({
        message: "PDF uploaded successfully",
        url: fileUrl,
      });
    } catch (err: any) {
      console.error("upload-pdf error:", err);
      res.status(500).json({
        message: "Upload failed",
        error: err.message || err,
      });
    }
  }
);

app.get("/api/v1/cloudinary-signature", async (req, res) => {
  try {
    const timestamp = Math.round(Date.now() / 1000);
    const folder = "brainly_uploads"; // adjust folder if needed

    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      process.env.CLOUDINARY_API_SECRET!
    );

    res.json({
      timestamp,
      signature,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating signature" });
  }
});

app.post(
  "/api/v1/save-pdf",
  auth,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { link, title } = req.body;
      await ContentModel.create({
        link,
        title,
        type: "PDF",
        userId: req.userId,
        tags: [],
      });
      res.json({ message: "Saved successfully" });
    } catch (err: any) {
      res
        .status(500)
        .json({ message: "Failed to save content", error: err.message });
    }
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("the server is listening on port " + PORT);
});
