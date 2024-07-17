import { EnvPropertiesEnums } from './env.properties.enums';

export module EnvProperties {
    // common properties
    export const Env: EnvPropertiesEnums.Env = EnvPropertiesEnums.Env.qa;

    export const Platform: EnvPropertiesEnums.Platform = EnvPropertiesEnums.Platform.localApp;

    export const Os: EnvPropertiesEnums.Os = EnvPropertiesEnums.Os.android;

    export const Headless: EnvPropertiesEnums.Headless = EnvPropertiesEnums.Headless.false;

    export const Browser: EnvPropertiesEnums.Browser = EnvPropertiesEnums.Browser.safari;

    // Notification related
    export const SendNotification: EnvPropertiesEnums.SendNotification = EnvPropertiesEnums.SendNotification.false;

    export const NotificationType: EnvPropertiesEnums.NotificationType = EnvPropertiesEnums.NotificationType.Slack;

    export const WebhookUrl: string = '';

    // Cloud related credentials
    export const CloudUserName = '';

    export const CloudKey = '';

    // Global timeouts
    export const ImplicitTimeout = 30000;
}
