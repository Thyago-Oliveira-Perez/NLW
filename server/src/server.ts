import express from "express";

const app = express();

app.get("/adds", (request, response) => {
  return response.json([
    { id: 1, name: "Thyago" },
    { id: 2, name: "Mari" },
    { id: 3, name: "Zeus" },
  ]);
});

/**
 * fica ouvindo novas requisições
 * e não para até que o usuário encerre
 */
app.listen(3033);
