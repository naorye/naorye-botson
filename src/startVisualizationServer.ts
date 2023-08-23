import connect from "connect";
import serveStatic from "serve-static";

function startVisualizationServer() {
  const port = Number(process.env.VISUALIZATION_SERVER_PORT);
  connect()
    .use(serveStatic(".", { index: "visualize/index.html" }))
    .listen(port, () =>
      console.log(`Visualization server running on ${port}...`)
    );
}

export { startVisualizationServer };
