import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ActiveJourneyState {
  isSharing: boolean;
  activeJourney: any | null;
  lastKnownLocation: any | null;
  sosAlert: any | null;
  batteryLevel?: number;
  lastUpdated: string;
}

// In-memory shared state between Antonella (Maceió) and Welbert (Diadema)
let globalTelemetry: ActiveJourneyState = {
  isSharing: false,
  activeJourney: null,
  lastKnownLocation: null,
  sosAlert: null,
  batteryLevel: 85,
  lastUpdated: new Date().toISOString()
};

async function start() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoints for real-time synchronization between Maceió and Diadema
  app.get('/api/telemetry', (_req, res) => {
    res.json(globalTelemetry);
  });

  app.post('/api/telemetry', (req, res) => {
    globalTelemetry = {
      ...globalTelemetry,
      ...req.body,
      lastUpdated: new Date().toISOString()
    };
    res.json({ success: true, telemetry: globalTelemetry });
  });

  // Reset or clear telemetry upon trip completion
  app.post('/api/telemetry/reset', (_req, res) => {
    globalTelemetry = {
      isSharing: false,
      activeJourney: null,
      lastKnownLocation: null,
      sosAlert: null,
      batteryLevel: 85,
      lastUpdated: new Date().toISOString()
    };
    res.json({ success: true });
  });

  // Server-Sent Events (SSE) stream for instant real-time push without battery drain
  app.get('/api/telemetry/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    const sendUpdate = () => {
      res.write(`data: ${JSON.stringify(globalTelemetry)}\n\n`);
    };

    sendUpdate();
    const interval = setInterval(sendUpdate, 3000);

    req.on('close', () => {
      clearInterval(interval);
      res.end();
    });
  });

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {}
      },
      appType: 'spa'
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
