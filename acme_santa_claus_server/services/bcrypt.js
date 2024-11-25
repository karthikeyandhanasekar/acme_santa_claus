// Hash value to hide confidential values
exports.hashValue = async (value) => {
  const bcrypt = require("bcrypt"); // Library for hashing value
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(value, salt);
};
// Compare hash values  with original values
exports.compareHashValue = async (originalValue, hashedValue) => {
  const bcrypt = require("bcrypt");
  return await bcrypt.compare(originalValue, hashedValue);
};
