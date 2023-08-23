interface EventPayload {
  name: string;
  botName: string;
  type?: string;
  hostname: string;
  referrer: string;
  uid?: string;
  geo: string;
  utm_source?: string;
  utm_campaign?: string;
  url: string;
  date: string;
  ip: string;
  googleGeo: string;
  version?: string;
  decodeUrl?: string;
  query: any;
  urlPathname: string;
  splitPathName?: string[];
  ua: string[];
  isIpV4: boolean;
  "@timestamp": string;
  isValidGeo: boolean;
  User_Agent_Str: string;
  diff?: number;
  iframeState?: string;
  googleRegion?: string;
  googleCity?: string;
  OneTap?: boolean;
  qa?: boolean;
  isTitleOnly?: boolean;
  jobClickCount?: number;
  keywords?: string[];
  timeZone?: string;
  versionName?: string;
  FirstSeen?: string;
  locpysical?: string[];
  gclid?: string;
  AB?: string[];
  origin?: string;
  session_id?: string;
  ua_client_id?: string;
  haveQ?: boolean;
  q?: string;
  ts?: number;
  impCount?: number;
  pageId?: string;
  outerWidth?: number;
  outerHeight?: number;
  isBotson?: boolean;
  languages?: string;
  oReferrer?: string;
}

interface EventData {
  Event_Name: string;
  Event_Type: string;
  Transaction_Direction: string;
  ip: string;
  Uid?: string;
  Bot_Name: string;
  User_Geo: string;
  URL: string;
  utm_source?: string;
  utm_campaign?: string;
  Geo_Ip: string;
  City_Ip?: string;
  AB?: string[];
}

interface EventDocument {
  Geo_Ip: string;
  City_Ip: string;
  Event_Type: string;
  Event_Name: string;
  User_Geo: string;
  AB: string;
  User_Agent: string;
  Bot_Name: string;
  Uid: string;
  ip: string;
  utm_campaign: string;
  utm_source: string;
  URL: string;
  User_Keyword: string;
  User_Location: string;
  TIMESTAMP: string;
  Date: string;
  Event_Payload: EventPayload;
  URL_Parameters: string;
  Hostname: string;
  Domain: string;
  Event_Data: EventData;
  "@timestamp": string;
}

export { EventDocument };
