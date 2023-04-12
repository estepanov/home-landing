import { ExpressionAttributeValueMap, Key, AttributeValue } from "aws-sdk/clients/dynamodb";
import dynamoDb from "./dynamodb";

export class DynamoTable {
    tableName: string;
    partitionKeyName: string;
    sortKeyName?: string;
    constructor(tableName: string, partitionKeyName: string, sortKeyName?: string) {
        this.tableName = tableName;
        this.partitionKeyName = partitionKeyName;
        this.sortKeyName = sortKeyName;
    }

    private formatKeys(partitionKey: string, sortKey?: string): Key {
        const key = {
            [this.partitionKeyName]: partitionKey,
        }
        if(this.sortKeyName && sortKey) {
            key[this.sortKeyName] = sortKey;
        }
        return key as Key;
    }

    private get tableNameParam() {
        return {
            TableName: this.tableName,
        };
    }

    private formatAtribName(dataKey: string) {
        return `#${dataKey}`;
    }

    private formatAtribValue(dataKey: string) {
        return `:${dataKey}`;
    }

    private formatExpressionAttributeNames(data: any) {
        const dataKeys = Object.keys(data);
        return dataKeys.reduce((acc, dataKey) => {
            return {
                ...acc,
                [this.formatAtribName(dataKey)]: dataKey,
            };
        }, {});
    }

    private formatExpressionAttributeValues(data: any) {
        const dataKeys = Object.keys(data);
        return dataKeys.reduce((acc, dataKey) => {
            return {
                ...acc,
                [this.formatAtribValue(dataKey)]: data[dataKey],
            };
        }, {});
    }

    private formatUpdateExpression(data: any) {
        const dataKeys = Object.keys(data);
        const kvps = dataKeys.map((dataKey) => `${this.formatAtribName(dataKey)} = ${this.formatAtribValue(dataKey)}`)
        return `set ${kvps.join(", ")}`;
    }

    query(partitionKeyValue: string, sortKeyValue?: string, overload: any = {}) {
        const ExpressionAttributeValues = {
            [this.formatAtribValue(this.partitionKeyName)]: partitionKeyValue,
        } as ExpressionAttributeValueMap

        if(this.sortKeyName && sortKeyValue) {
            ExpressionAttributeValues[this.formatAtribValue(this.sortKeyName)] = sortKeyValue as AttributeValue
        }

        return dynamoDb.query({
            ...this.tableNameParam,
            ...overload,
            KeyConditionExpression: `${this.partitionKeyName} = ${this.formatAtribValue(this.partitionKeyName)}`,
            ExpressionAttributeValues
        });
    }

    getItem(partitionKey: string, sortKey?: string) {
        return dynamoDb.get({
            ...this.tableNameParam,
            Key: this.formatKeys(partitionKey, sortKey),
        });
    }

    putItem(partitionKey: string, sortKey: string, item: any) {
        return dynamoDb.put({
            ...this.tableNameParam,
            Item: {
                ...this.formatKeys(partitionKey, sortKey),
                ...item,
            },
        });
    }

    deleteItem(partitionKey: string, sortKey?: string) {
        return dynamoDb.delete({
            ...this.tableNameParam,
            Key: this.formatKeys(partitionKey, sortKey),
        });
    }

    updateItem(partitionKey: string, sortKey: string, item: any) {
        return dynamoDb.update({
            ...this.tableNameParam,
            Key: this.formatKeys(partitionKey, sortKey),
            UpdateExpression: this.formatUpdateExpression(item),
            ExpressionAttributeNames: this.formatExpressionAttributeNames(item),
            ExpressionAttributeValues: this.formatExpressionAttributeValues(item),
        });
    }

    putOrUpdateItem(partitionKey: string, sortKey: string, item: any) {
        return this.getItem(partitionKey, sortKey)
            .then((data) => {
                if(data.Item) {
                    console.log('Item exists, updating...')
                    return this.updateItem(partitionKey, sortKey, item);
                }
                console.log('Item does not exist, creating...')
                return this.putItem(partitionKey, sortKey, item);
            });
    }
}