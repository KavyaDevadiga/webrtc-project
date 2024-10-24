import passport, { Strategy } from "passport";

export class BaseStrategy {
  private strategy: Strategy;
  constructor(strategy: Strategy) {
    this.strategy = strategy;
    this.initialize();
  }

  private initialize() {
    passport.use(this.strategy);
    passport.serializeUser((user, done) => {
      done(null, {});
    });

    passport.deserializeUser(async (id, done) => {
      try {
        // const user = await User.findById(id);
        done(null, {});
      } catch (err) {
        done(err, null);
      }
    });
  }
}
