"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const JWT_SECRET = "NAVYA THE GREAT";
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect("mongodb+srv://navyasinha23:navya1875@cluster0.97m2kny.mongodb.net/Second-Brain");
        console.log("mongo connected");
    });
}
connectDB();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const auth = (req, res, next) => {
    try {
        const token = req.headers.token;
        const verifiedtoken = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (verifiedtoken) {
            //@ts-ignore
            req.userId = verifiedtoken.id;
            next();
        }
    }
    catch (e) {
        res.json({
            message: "token not provided!",
        });
    }
};
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredbody = zod_1.z.object({
        name: zod_1.z.string().min(3).max(20),
        email: zod_1.z.string().max(20).email(),
        password: zod_1.z.string().min(5).max(30),
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
        const hashedpassword = yield bcrypt_1.default.hash(password, 5);
        yield db_1.UserModel.create({
            name: name,
            email: email,
            password: hashedpassword,
        });
    }
    catch (e) {
        res.json({
            message: "user already exists",
        });
        return;
    }
    res.json({
        message: "you are signed Up",
    });
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const founduser = yield db_1.UserModel.findOne({
        email: email,
    });
    if (!founduser) {
        res.json({
            message: "incorrect credentials",
        });
    }
    else {
        const passwordmatched = yield bcrypt_1.default.compare(password, founduser.password);
        if (founduser && passwordmatched) {
            const token = jsonwebtoken_1.default.sign({
                id: founduser._id,
            }, JWT_SECRET);
            res.json({
                token,
            });
        }
        else {
            res.json({
                message: "incorrect password",
            });
        }
    }
}));
app.post("/content", auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    try {
        yield db_1.ContentModel.create({
            link: link,
            type: type,
            title: title,
            //@ts-ignore
            userId: req.userId,
            tags: [],
        });
    }
    catch (e) {
        res.json({
            message: e,
        });
        return;
    }
    res.json({
        message: "content created!",
    });
}));
app.get("/content", auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({
        userId: userId,
    }).populate("userId", "name");
    res.json({
        content: content,
    });
}));
app.delete("/content", auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield db_1.ContentModel.deleteMany({
        contentId,
        userId: req.body.id,
    });
}));
app.post("/api/v1/brain/share", auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share; // whether or not the person wants to enable or disable the link to share
    if (share) {
        const hash = (0, utils_1.random)(10);
        const linkexists = yield db_1.LinkModel.findOne({
            //@ts-ignore
            userId: req.userid,
        });
        if (linkexists) {
            res.json({
                message: "/share" + linkexists.hash,
            });
            return;
        }
        yield db_1.LinkModel.create({
            //@ts-ignore
            userId: req.userid,
            hash,
        });
        res.json({
            message: "/share" + hash,
        });
    }
    else {
        yield db_1.LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userid,
        });
        res.json({
            message: "deleted link ",
        });
    }
}));
app.get("/api/v1/brain/:shareLink", auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({
        hash: hash,
    });
    if (!link) {
        res.json({
            message: "incorrect link",
        });
        return;
    }
    const content = yield db_1.ContentModel.findOne({
        userId: link.userId,
    });
    const user = yield db_1.UserModel.findOne({
        _id: link.userId,
    });
    res.json({
        username: user === null || user === void 0 ? void 0 : user.name,
        content: content,
    });
}));
app.listen(3000, function () {
    console.log("the server is listening on port 3000 ");
});
