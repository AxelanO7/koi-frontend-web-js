"use strict";

const fileUpload = require("express-fileupload");
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../upload/poster")));
app.use(express.static(path.join(__dirname, "../upload/proof")));
app.use(express.static(path.join(__dirname, "../upload/proposal")));
app.use(express.static(path.join(__dirname, "../upload/profile")));
app.use(express.static(path.join(__dirname, "../upload/cover")));
app.use(express.static(path.join(__dirname, "../upload/sertificate")));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server!" });
});

// poster
app.post("/local/upload/poster", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      message: "No files were uploaded.",
      status: false,
      data: null,
    });
  }

  let uploadedFile = req.files?.file;
  let uploadPath = path.join(__dirname, "../upload/poster", uploadedFile.name);

  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({
        message: "No files were uploaded.",
        status: false,
        data: null,
      });
    }

    return res.status(201).json({
      message: "File uploaded successfully",
      status: true,
      data: {
        path: `/upload/poster/${uploadedFile.name}`,
      },
    });
  });
});

// proof
app.post("/local/upload/proof", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      message: "No files were uploaded.",
      status: false,
      data: null,
    });
  }

  let uploadedFile = req.files?.file;
  let uploadPath = path.join(__dirname, "../upload/proof", uploadedFile.name);

  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({
        message: "No files were uploaded.",
        status: false,
        data: null,
      });
    }

    return res.status(201).json({
      message: "File uploaded successfully",
      status: true,
      data: {
        path: `/upload/proof/${uploadedFile.name}`,
      },
    });
  });
});

// proposal
app.post("/local/upload/proposal", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      message: "No files were uploaded.",
      status: false,
      data: null,
    });
  }

  let uploadedFile = req.files?.file;
  let uploadPath = path.join(
    __dirname,
    "../upload/proposal",
    uploadedFile.name
  );

  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({
        message: "No files were uploaded.",
        status: false,
        data: null,
      });
    }

    return res.status(201).json({
      message: "File uploaded successfully",
      status: true,
      data: {
        path: `/upload/proposal/${uploadedFile.name}`,
      },
    });
  });
});

// profile
app.post("/local/upload/profile", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      message: "No files were uploaded.",
      status: false,
      data: null,
    });
  }

  let uploadedFile = req.files?.file;
  let uploadPath = path.join(__dirname, "../upload/profile", uploadedFile.name);

  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({
        message: "No files were uploaded.",
        status: false,
        data: null,
      });
    }

    return res.status(201).json({
      message: "File uploaded successfully",
      status: true,
      data: {
        path: `/upload/profile/${uploadedFile.name}`,
      },
    });
  });
});

// cover
app.post("/local/upload/cover", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      message: "No files were uploaded.",
      status: false,
      data: null,
    });
  }

  let uploadedFile = req.files?.file;
  let uploadPath = path.join(__dirname, "../upload/cover", uploadedFile.name);

  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({
        message: "No files were uploaded.",
        status: false,
        data: null,
      });
    }

    return res.status(201).json({
      message: "File uploaded successfully",
      status: true,
      data: {
        path: `/upload/cover/${uploadedFile.name}`,
      },
    });
  });
});

// sertificate
app.post("/local/upload/sertificate", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      message: "No files were uploaded.",
      status: false,
      data: null,
    });
  }

  let uploadedFile = req.files?.file;
  let uploadPath = path.join(
    __dirname,
    "../upload/sertificate",
    uploadedFile.name
  );

  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({
        message: "No files were uploaded.",
        status: false,
        data: null,
      });
    }

    return res.status(201).json({
      message: "File uploaded successfully",
      status: true,
      data: {
        path: `/upload/sertificate/${uploadedFile.name}`,
      },
    });
  });
});

const port = 4500;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

module.exports = app;
