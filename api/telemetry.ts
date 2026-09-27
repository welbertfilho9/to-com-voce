// Vercel Serverless Function for /api/telemetry
let memoryCache: any = {
  isSharing: false,
  activeJourney: null,
  lastKnownLocation: null,
  sosAlert: null,
  batteryLevel: 85,
  lastUpdated: new Date().toISOString()
};

export default function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      memoryCache = {
        ...memoryCache,
        ...body,
        lastUpdated: new Date().toISOString()
      };
      return res.status(200).json({ success: true, telemetry: memoryCache });
    } catch {
      return res.status(400).json({ error: 'Invalid JSON' });
    }
  }

  // GET
  return res.status(200).json(memoryCache);
}
