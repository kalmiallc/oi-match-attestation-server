export interface IConfig {
    port: number;
    api_keys: string[];
}

export default () => {
    const api_keys = process.env.API_KEYS?.split(",") || [""];
    const config: IConfig = {
        port: parseInt(process.env.PORT || "3000"),
        api_keys,
    };
    return config;
};
