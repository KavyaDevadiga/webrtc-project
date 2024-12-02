import { initializeGoogleKeyModel } from "@src/models/googleKeys.models";
import { initializeUserModel } from "@src/models/user.models";
export { GoogleKey } from "@src/models/googleKeys.models";
export { User } from "@src/models/user.models";

const initializeModel = [initializeUserModel, initializeGoogleKeyModel];

export { initializeModel };
