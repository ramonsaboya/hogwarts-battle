import {Server} from 'http';

export class InactivityMonitor {
  private readonly httpServer: Server;
  private readonly inactivityThresholdInMinutes: number;

  private shutdownTimer: NodeJS.Timeout | null = null;

  constructor(httpServer: Server, shutdownDelayInMinutes: number) {
    this.httpServer = httpServer;
    this.inactivityThresholdInMinutes = shutdownDelayInMinutes;
  }

  public scheduleShutdown() {
    if (this.shutdownTimer) {
      clearTimeout(this.shutdownTimer);
    }

    this.shutdownTimer = setTimeout(
      () => {
        console.log(
          `No clients connected for ${this.inactivityThresholdInMinutes} minute(s), shutting down server`
        );
        this.httpServer.close();
      },
      this.inactivityThresholdInMinutes * 10 * 1000
    );
  }

  public clearShutdownTimer() {
    if (this.shutdownTimer) {
      clearTimeout(this.shutdownTimer);
      this.shutdownTimer = null;
    }
  }
}
