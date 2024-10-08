import type { AST_NODE_TYPES } from '../../ast-node-types';
import type { BaseNode } from '../../base/BaseNode';
import type { JSXTagNameExpression } from '../../unions/JSXTagNameExpression';

export interface JSXClosingElement extends BaseNode {
  name: JSXTagNameExpression;
  type: AST_NODE_TYPES.JSXClosingElement;
}
