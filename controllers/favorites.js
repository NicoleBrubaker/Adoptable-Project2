const express = require("express");
const router = require("express").Router();
const { Favorite } = require("../models");

router.get("/note/:id", async(req, res) => {
  const id = req.params.id;
  res.render("note", {id});
})

router.post("/addnote/:id", async (req, res) => {
  //handle save
  const id = req.params.id;
  const formData = await req.body;
  const note = formData.note;
  
  await Favorite.update({note}, {
    where: {
      id: id
    }
  });

  //redirect to user page
  const favoritesData = await Favorite.findAll();
  const favorites = favoritesData.map((favorite) =>
    favorite.get({ plain: true })
  );
  res.render("user", {
    favorites,
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;