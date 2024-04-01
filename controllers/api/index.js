const { getToken } = require("../../utils/tokenManager");
const router = require("express").Router();

router.get("/dogs", async (req, res) => {
  try {
     const fetch = (await import("node-fetch")).default;
    const token = await getToken(); // Ensure a valid token
    const response = await fetch(
      "https://api.petfinder.com/v2/animals?type=dog",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
