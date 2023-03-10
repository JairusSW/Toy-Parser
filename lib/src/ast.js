import { StringLiteral } from "../nodes/StringLiteral.js";
import { TypeExpression } from "../nodes/TypeExpression.js";
import { VariableStatement } from "../nodes/VariableStatement.js";
import { Token, Tokenizer } from "./tokenizer.js";
export class AST {
    constructor(data) {
        this.statements = [];
        this.pos = 0;
        this.data = data;
        this.tokenizer = new Tokenizer(this.data);
        const tokenData = this.tokenizer.getToken();
        if (tokenData.token == Token.Identifier) {
            if (tokenData.text == "string") {
                const pos = this.tokenizer.pos;
                const nameToken = this.tokenizer.getToken();
                const eqToken = this.tokenizer.getToken();
                const valueToken = this.tokenizer.getToken();
                const semiToken = this.tokenizer.getToken();
                if (nameToken.token == Token.Identifier && eqToken.token == Token.Equals && valueToken.token == Token.String && semiToken.token == Token.Semi) {
                    // Obviously a variable
                    this.statements.push(new VariableStatement(new StringLiteral(valueToken.text), nameToken.text, new TypeExpression([tokenData.text], false), false));
                }
            }
        }
    }
}
