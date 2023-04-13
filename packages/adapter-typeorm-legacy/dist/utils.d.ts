import type { DataSource, DataSourceOptions } from "typeorm";
/** Ensure configOrString is normalized to an object. */
export declare function parseDataSourceConfig(configOrString: string | DataSourceOptions): DataSourceOptions;
export declare function updateConnectionEntities(dataSource: DataSource, entities: any[]): Promise<void>;
