import "dotenv/config";

import path from "path";
import ms from "ms";
import { EventDocument } from "./types";
import { eventsStream } from "./eventsStream";
import { createCountStream } from "./createCountStream";
import { startVisualizationServer } from "./startVisualizationServer";
import { EventRateAnomalyDetector } from "./EventRateAnomalyDetector";

async function start() {
  const pipeline = await eventsStream();

  const anomalyDetector = new EventRateAnomalyDetector(ms("30 seconds"), {
    min: 3,
    max: 10,
  });
  pipeline
    .on("data", (data) => {
      anomalyDetector.addEvent(new Date(data["TIMESTAMP"]));
    })
    .on("end", () =>
      anomalyDetector.generateChartData(
        path.join(__dirname, "../data/event-rates.json")
      )
    );

  createCountStream<EventDocument>(
    pipeline,
    "User_Geo",
    path.join(__dirname, "../data/user-geo.json")
  );

  createCountStream<EventDocument>(
    pipeline,
    "Bot_Name",
    path.join(__dirname, "../data/bot-name.json")
  );

  startVisualizationServer();
}

start();
