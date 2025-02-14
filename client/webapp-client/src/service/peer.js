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
      });
    }
  }

  async getPeer() {
    return this.peer;
  }

  async answerCall(offer) {
    if (this.peer) {
      await this.peer.setRemoteDescription(offer);
      const ans = await this.peer.createAnswer();
      console.log("25-----", ans);
      await this.peer.setLocalDescription(new RTCSessionDescription(ans));
      return ans;
    }
  }

  async getOffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      console.log("-----", offer);
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    }
  }

  async setLocalDescription(ans) {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
    }
  }
}

export default new PeerService();
