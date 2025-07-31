
/**
 * @deprecated SQlite storage and all classes linked to it are deprecated in favor of RouteApiService
 */
export class DBC_Plan {
    tableName: string
    fields: string[]
    fieldsType: string[]
    attributes: string[]
    fieldsCount: number

    constructor(tableName: string, fields: string[], fieldsType: string[], attributes: string[]) {
        this.tableName = tableName
        this.fields = fields
        this.fieldsType = fieldsType
        this.attributes = attributes
        this.fieldsCount = fields.length
    }

    getCreateStatement(): string {
        var stmt: string = "CREATE TABLE IF NOT EXISTS " + this.tableName + " ("
        for (var i = 0; i < this.fields.length; i++) {
            stmt += this.fields[i] + " " + this.fieldsType[i] + " " + this.attributes[i]
            if (i < this.fields.length - 1) {
                stmt += ","
            }
        }

        return stmt + ")"
    }

    /*
    returns a string for bulk statements of all available fields in the form of:
    (field1, field2, field3, ..., fieldn)
     */
    getFieldsInScopes(): string {
        var result: string = "("
        for (var i = 0; i < this.fields.length; i++) {
            if (i < this.fields.length - 1) {
                result += this.fields[i] + ", "
            }
            else {
                result += this.fields[i]
            }
        }
        return result + ")"
    }

    /*
    returns a string for bulk statements of all available field placehokder in the form of:
    (?, ?, ?, ?)
     */
    getFieldsPlaceholders(): string {
        var result: string = "("
        for (var i = 0; i < this.fields.length; i++) {
            if (i < this.fields.length - 1) {
                result += "?, "
            }
            else {
                result += "?"
            }
        }
        return result + ")"
    }

    getTableName(): string {
        return this.tableName;
    }
}
