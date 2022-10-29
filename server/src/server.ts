import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinuteNumber } from "./utils/convert-hour-string-to-minutes-number";
import { convertMinutesNumberToHourString } from "./utils/convert-minutes-number-to-hours-string";

const app = express();
//say that we are using json to input data
app.use(express.json());
//enable localhost:3000 to make requests to our APIRest
app.use(
  cors({
    origin: "http:localhost:3000",
  })
);

const prisma = new PrismaClient({
  //show the sql query on the shell
  log: ["query"],
});

//list games
app.get("/games", async (request, response) => {
  const games = await prisma.games.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });
  return response.json(games);
});

//create an Ad
app.post("games/:gameId/ads", async (request, response) => {
  const gameId = request.params.gameId;
  const body = request.body;

  const newAd = await prisma.ads.create({
    data: {
      gamesId: gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hourStart: convertHourStringToMinuteNumber(body.hourStart),
      hourEnd: convertHourStringToMinuteNumber(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });
  return response.json(newAd);
});

//list ads by game
app.get("/games/:id/ads", async (request, response) => {
  const id = request.params.id;

  const ads = await prisma.ads.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gamesId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return response.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutesNumberToHourString(ad.hourStart),
        hourEnd: convertMinutesNumberToHourString(ad.hourEnd),
      };
    })
  );
});

//list discord by ad id
app.get("/ads/:id/discord", async (request, response) => {
  const adId = request.params.id;

  const ad = await prisma.ads.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return response.json({
    discord: ad.discord,
  });
});

/**
 * fica ouvindo novas requisições
 * e não para até que o usuário encerre
 */
app.listen(3033);
