import type { AST_NODE_TYPES } from '../../ast-node-types';
import type { BaseNode } from '../../base/BaseNode';
import type { TypeNode } from '../../unions/TypeNode';

export interface TSArrayType extends BaseNode {
  elementType: TypeNode;
  type: AST_NODE_TYPES.TSArrayType;
}
