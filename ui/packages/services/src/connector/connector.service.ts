/**
 * @license
 * Copyright 2020 JBoss Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
    Connector, ConnectionValidationResult, FilterValidationResult, PropertiesValidationResult
} from "@debezium/ui-models";
import {BaseService} from "../baseService";

/**
 * The connector service.  Used to fetch connectors and other connector operations.
 */
export class ConnectorService extends BaseService {

    /**
     * Validate the connection properties for the supplied connection type
     * Example usage:
     * 
     * const connectorService = Services.getConnectorService();
     * const body = { "oneParm: oneValue", "twoParam: twoValue"}
     * connectorService.validateConnection('postgres', body)
     *  .then((result: ConnectionValidationResult) => {
     *    if (result.status === 'INVALID') {
     *      alert('status is INVALID');
     *    } else {
     *      alert('status is VALID');
     *    }
     *  });
     */
    public validateConnection(connectorTypeId: string, body: any): Promise<ConnectionValidationResult> {
        this.logger.info("[ConnectorService] Validating connection:", connectorTypeId);

        const endpoint: string = this.endpoint("/connector-types/:connectorTypeId/validation/connection", { connectorTypeId });
        return this.httpPostWithReturn(endpoint, body);
    }

    /**
     * Validate the filters for the supplied connection type
     * Example usage:
     * 
     * const connectorService = Services.getConnectorService();
     * const body = { "oneParm: oneValue", "twoParam: twoValue"}
     * connectorService.validateFilters('postgres', body)
     *  .then((result: FilterValidationResult) => {
     *    if (result.status === 'INVALID') {
     *      alert('status is INVALID');
     *    } else {
     *      alert('status is VALID');
     *    }
     *  });
     */
    public validateFilters(connectorTypeId: string, body: any): Promise<FilterValidationResult> {
        this.logger.info("[ConnectorService] Validating filters:", connectorTypeId);

        const endpoint: string = this.endpoint("/connector-types/:connectorTypeId/validation/filters", { connectorTypeId });
        return this.httpPostWithReturn(endpoint, body);
    }

    /**
     * Validate the properties for the supplied connection type
     * Example usage:
     * 
     * const connectorService = Services.getConnectorService();
     * const body = { "oneParm: oneValue", "twoParam: twoValue"}
     * connectorService.validateProperties('postgres', body)
     *  .then((result: PropertiesValidationResult) => {
     *    if (result.status === 'INVALID') {
     *      alert('status is INVALID');
     *    } else {
     *      alert('status is VALID');
     *    }
     *  });
     */
    public validateProperties(connectorTypeId: string, body: any): Promise<PropertiesValidationResult> {
        this.logger.info("[ConnectorService] Validating properties:", connectorTypeId);

        const endpoint: string = this.endpoint("/connector-types/:connectorTypeId/validation/properties", { connectorTypeId });
        return this.httpPostWithReturn(endpoint, body);
    }

    /**
     * Create Connector using the supplied ConnectorConfiguration
     * Example usage:
     * 
     * const connectorService = Services.getConnectorService();
     * const configMap = new Map<string,string>();
     * configMap.set("oneParam","oneValue");
     * configMap.set("twoParam","twoValue");
     * const config = new ConnectorConfiguration("connName", configMap);
     * connectorService.createConnector(config)
     *  .then((result: CreateConnectorResult) => {
     *  });
     */
    public createConnector(clusterId: number, connectorTypeId: string, body: any): Promise<void> {
        this.logger.info("[ConnectorService] Creating a connector:");

        const endpoint: string = this.endpoint("/connector/:clusterId/:connectorTypeId", { clusterId, connectorTypeId });
        return this.httpPostWithReturn(endpoint, body);
    }

    /**
     * Get the available connectors for the supplied clusterId
     */
    public getConnectors(clusterId: number): Promise<Connector[]> {
        this.logger.info("[ConnectorService] Getting the list of connectors.");

        const endpoint: string = this.endpoint("/connectors/:clusterId", { clusterId });
        return this.httpGet<Connector[]>(endpoint);
    }

    /**
     * Delete the Connector for the supplied clusterId
     */
    public deleteConnector(clusterId: number, connectorName: string): Promise<Connector[]> {
        this.logger.info("[ConnectorService] Delete the connector");

        const endpoint: string = this.endpoint("/connectors/:clusterId/:connectorName", { clusterId, connectorName });
        return this.httpDelete<any>(endpoint);
    }

}
