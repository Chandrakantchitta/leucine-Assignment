async function addEquipment() {
  const data = {
    name: name.value,
    type: type.value,
    quantity: quantity.value,
    status: status.value
  };

  await fetch("http://localhost:3000/equipment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  loadEquipment();
}

async function loadEquipment() {
  const res = await fetch("http://localhost:3000/equipment");
  const items = await res.json();

  list.innerHTML = "";
  items.forEach(e => {
    list.innerHTML += `<li>${e.name} - ${e.status}</li>`;
  });
}

loadEquipment();
const express = require("express");
const mongoose = require("mongoose");
const Equipment = require("./models/Equipment");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/equipmentdb");

// CREATE
app.post("/equipment", async (req, res) => {
  const equipment = new Equipment(req.body);
  await equipment.save();
  res.send(equipment);
});

// READ
app.get("/equipment", async (req, res) => {
  const list = await Equipment.find();
  res.send(list);
});

// UPDATE
app.put("/equipment/:id", async (req, res) => {
  const updated = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updated);
});

// DELETE
app.delete("/equipment/:id", async (req, res) => {
  await Equipment.findByIdAndDelete(req.params.id);
  res.send({ message: "Deleted successfully" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
