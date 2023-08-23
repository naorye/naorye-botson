import { Client } from "@elastic/elasticsearch";
import { parser } from "stream-json";
import { streamValues } from "stream-json/streamers/StreamValues";
import { pick } from "stream-json/filters/Pick";
import type BodyReadable from "undici/types/readable";
import { EventDocument } from "./types";
import { Transform } from "stream";
import { SearchTotalHits } from "@elastic/elasticsearch/lib/api/types";

async function eventsStream() {
  const client = new Client({
    node: process.env.ELASTIC_SEARCH_NODE,
    auth: {
      username: process.env.ELASTIC_SEARCH_USERNAME,
      password: process.env.ELASTIC_SEARCH_PASSWORD,
    },
  });

  let response = await client.search({
    index: process.env.ELASTIC_SEARCH_INDEX_NAME,
    size: 0,
  });

  const total = (response.hits.total as SearchTotalHits).value;

  const result = (await client.search(
    {
      index: process.env.ELASTIC_SEARCH_INDEX_NAME,
      body: {
        sort: [{ TIMESTAMP: { order: "asc" } }],
      },
      size: total,
    },
    {
      asStream: true,
    }
  )) as unknown as BodyReadable;

  return result
    .pipe(parser())
    .pipe(pick({ filter: /hits.hits.\d+._source/ }))
    .pipe(streamValues())
    .pipe(
      new Transform({
        objectMode: true,
        transform(
          chunk: { key: number; value: EventDocument },
          _encoding,
          callback
        ) {
          callback(null, chunk.value);
        },
      })
    );
}

export { eventsStream };
