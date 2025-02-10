class PeerService {
  constructor() {
    if (!this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
        bundlePolicy: "balanced", // Less aggressive bundling
        rtcpMuxPolicy: "require",
        sdpSemantics: "unified-plan",
        // iceCandidatePoolSize: 10,
        // Add these for local testing
        iceTransportPolicy: "all",
        // Enable local candidates
        iceCandidatePoolSize: 0,
      });

      // Set bandwidth constraints
      const transceivers = this.peer.getTransceivers();
      transceivers.forEach((transceiver) => {
        if (transceiver.sender.track?.kind === "video") {
          transceiver.setCodecPreferences(this.getOptimizedVideoCodecs());
        }
      });
    }
  }

  // Helper method to get optimized video codecs
  getOptimizedVideoCodecs() {
    const capabilities = RTCRtpSender.getCapabilities("video");
    if (!capabilities) return [];

    // Prioritize VP8 and H.264 codecs with lower bitrates
    return capabilities.codecs
      .filter(
        (codec) =>
          codec.mimeType.toLowerCase() === "video/vp8" ||
          codec.mimeType.toLowerCase() === "video/h264"
      )
      .sort((a, b) => {
        // Prioritize H.264 for better hardware acceleration support
        if (a.mimeType.toLowerCase() === "video/h264") return -1;
        if (b.mimeType.toLowerCase() === "video/h264") return 1;
        return 0;
      });
  }

  async getPeer() {
    return this.peer;
  }

  async answerCall(offer) {
    if (this.peer) {
      await this.peer.setRemoteDescription(offer);
      const ans = await this.peer.createAnswer();
      await this.peer.setLocalDescription(new RTCSessionDescription(ans));
      return ans;
    }
  }

  async getOffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    }
  }

  async setLocalDescription(ans) {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
    }
  }

  // Add this method to dynamically adjust video bitrate
  async setBandwidthConstraints(track) {
    try {
      const sender = this.peer.getSenders().find((s) => s.track === track);
      if (!sender) return;

      const params = sender.getParameters();
      if (!params.encodings) {
        params.encodings = [{}];
      }
      console.log("Bandwidth constraints set to:");
      params.encodings[0].maxBitrate = 1500000;
      params.encodings[0].initialBitrate = 800000;
      params.encodings[0].adaptivePtime = true;
      params.encodings[0].scaleResolutionDownBy = 1.0;

      await sender.setParameters(params);
    } catch (error) {
      console.error("Error setting bandwidth constraints:", error);
    }
  }

  // Add this to monitor connection quality
  setupQualityMonitoring() {
    if (!this.peer) return;

    setInterval(async () => {
      try {
        const stats = await this.peer.getStats();
        stats.forEach((report) => {
          if (
            report.type === "candidate-pair" &&
            report.state === "succeeded"
          ) {
            if (report.currentRoundTripTime > 0.5) {
              this.adjustVideoQuality("decrease");
            }
          }
          if (report.type === "media-source" && report.kind === "video") {
            if (report.framesDropped > 30) {
              this.adjustVideoQuality("decrease");
            }
          }
        });
      } catch (error) {
        console.error("Error monitoring connection:", error);
      }
    }, 3000);
  }

  async adjustVideoQuality(action) {
    const videoTrack = this.peer
      .getSenders()
      .find((sender) => sender.track?.kind === "video")?.track;

    if (!videoTrack) return;

    if (action === "decrease") {
      const constraints = {
        width: { ideal: 640 },
        height: { ideal: 480 },
        frameRate: { max: 24 },
      };
      await videoTrack.applyConstraints(constraints);
    }
  }
}

export default new PeerService();
