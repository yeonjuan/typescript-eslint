import type { AST_NODE_TYPES } from '../../ast-node-types';
import type { BaseNode } from '../../base/BaseNode';
import type { TypeElement } from '../../unions/TypeElement';

export interface TSInterfaceBody extends BaseNode {
  body: TypeElement[];
  type: AST_NODE_TYPES.TSInterfaceBody;
}
