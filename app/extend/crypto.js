"use strict";

const crypto = require("crypto");

const secret = "mamba";

const _crypto = (val) => {
  return crypto.createHmac("md5", secret).update(val).digest("hex");
};

module.exports = _crypto;
