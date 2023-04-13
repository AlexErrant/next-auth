import type { Session } from "neo4j-driver";
export declare const format: {
    /** Takes a plain old JavaScript object and turns it into a Neo4j compatible object */
    to(object: Record<string, any>): Record<string, unknown>;
    /** Takes a Neo4j object and returns a plain old JavaScript object */
    from<T = Record<string, unknown>>(object?: Record<string, any>): T | null;
};
export declare function client(session: Session): {
    /** Reads values from the database */
    read<T>(statement: string, values?: any): Promise<T | null>;
    /**
     * Reads/writes values from/to the database.
     * Properties are available under `$data`
     */
    write<T_1 extends Record<string, any>>(statement: string, values: T_1): Promise<any>;
};
