declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ELASTIC_SEARCH_NODE: string;
      ELASTIC_SEARCH_USERNAME: string;
      ELASTIC_SEARCH_PASSWORD: string;
      ELASTIC_SEARCH_INDEX_NAME: string;
      VISUALIZATION_SERVER_PORT: string;
    }
  }
}

export {};
