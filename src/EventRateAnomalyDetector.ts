import fs from "fs";

class EventRateAnomalyDetector {
  private timestamps: number[] = [];
  private eventRates: {
    timestamp: number;
    rate: number;
    hasAnomaly: boolean;
  }[] = [];

  constructor(
    // Size of the sliding time window in milliseconds
    private windowSize: number,

    // Threshold for detecting anomalies in the event rate
    private threshold: { min: number; max: number }
  ) {}

  addEvent(eventDate: Date) {
    const timestamp = eventDate.getTime();
    this.timestamps.push(timestamp);

    this.filterWindowEvents(timestamp);

    const eventRate = this.calculateEventRate();
    const hasAnomaly =
      eventRate < this.threshold.min || eventRate > this.threshold.max;
    if (hasAnomaly) {
      console.log(
        `Anomaly detected at ${new Date(
          timestamp
        ).toISOString()} (events rate is ${eventRate})`
      );
    }
    this.eventRates.push({ timestamp, rate: eventRate ?? 0, hasAnomaly });
  }

  public generateChartData(path: string) {
    fs.writeFileSync(path, JSON.stringify(this.eventRates));
  }

  private filterWindowEvents(currentTimestamp: number) {
    const windowStart = currentTimestamp - this.windowSize;
    this.timestamps = this.timestamps.filter(
      (eventTimestamp) => eventTimestamp >= windowStart
    );
  }

  private calculateEventRate() {
    if (this.timestamps.length === 0) {
      return 0;
    }
    if (this.timestamps.length === 1) {
      return 1;
    }

    const windowDuration =
      this.timestamps[this.timestamps.length - 1] - this.timestamps[0];
    const eventRate = (this.timestamps.length / windowDuration) * 1000; // Convert to events per second
    return eventRate;
  }
}

export { EventRateAnomalyDetector };
