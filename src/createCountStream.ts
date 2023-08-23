import fs from "fs";
import { Readable } from "stream";

type PrimitiveFields<O> = {
  [K in keyof O]: O[K] extends string | number ? K : never;
}[keyof O];

function createCountStream<O>(
  pipeline: Readable,
  field: PrimitiveFields<O>,
  path: string
) {
  const valuesCount: Record<string, number> = {};

  pipeline
    .on("data", (event: O) => {
      const value = event[field];
      if (typeof valuesCount[`${value}`] !== "number") {
        valuesCount[`${value}`] = 0;
      }
      valuesCount[`${value}`] += 1;
    })
    .on("end", () => {
      fs.writeFileSync(path, JSON.stringify(valuesCount));
    });
}

export { createCountStream };
