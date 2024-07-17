/* eslint no-shadow: "off" */

export module EnvPropertiesEnums {
    export enum Env { qa = 'qa', dev = 'dev' }

    export enum Os { android = 'android', ios = 'ios' }

    export enum Platform {
        localWeb = 'localWeb', lambdatestWeb = 'lambdatestWeb',
        browserstackWeb = 'browserstackWeb', localApp = 'localApp',
        lambdatestApp = 'lambdatestApp', browserstackApp = 'browserstackApp'
    }

    export enum Headless { true = 'true', false = 'false' }

    export enum Browser { chrome = 'chrome', firefox = 'firefox', safari = 'safari' }

    export enum SendNotification { true = 'true', false = 'false' }

    export enum NotificationType { Slack = 'Slack', Discord = 'Discord' }
}
